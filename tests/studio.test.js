import assert from "node:assert/strict"
import test from "node:test"
import { create_studio_server, project_member_profile, public_member } from "../src/lib/server/studio.js"
import { transform_theme, secure_site_response } from "../src/lib/server/site-response.js"
import { create_public_page_analytics } from "classhelm/public-page-analytics"

const slug = "abcdefgh", other_slug = "ijklmnop"
const member_id = "11111111-1111-4111-8111-111111111111"
const booking_id = "11111111-1111-4111-8111-111111111112"
const customer = { id: member_id, display_name: "Test member", email: "member@example.test" }
const session = () => ({ access_token:"controlled-access-token-long-enough",refresh_token:"controlled-refresh-token",
  expires_at:Math.floor(Date.now()/1000)+3600,organization_slug:slug,customer })
const profile = () => ({ api_version:1,profile:{ customer_id:member_id,display_name:customer.display_name,email:customer.email,phone:null,birth_date:null } })
const experience = () => ({ api_version:1,organization:{ id:member_id,slug,name:"Test studio" },person_id:member_id,customer_id:member_id,
  goals:{ tags:[],text:null,challenge:null,status:"unanswered" },work_roles:[],presentation:{ show_work:false,show_workspace_tools:false } })
const feedback = () => ({ booking_id,session:{ id:member_id,title:"Test class",starts_at:"2026-09-01T09:00:00Z",ends_at:"2026-09-01T10:00:00Z",location_name:null,timezone:"UTC" },
  feedback:{ text:"A helpful class",rating:null,updated_at:"2026-09-30T10:00:00Z" } })

function fixture() {
  const values = new Map(), writes = [], calls = [], headers = {}
  const url = new URL("https://studio.example.test/api/member/session/login")
  const event = { url,params:{ action:"login" },locals:{},setHeaders: input => Object.assign(headers,input),
    cookies:{ get:name => values.get(name),getAll:() => [...values].map(([name,value]) => ({name,value})),
      set:(name,value,options) => { writes.push({name,value,options});values.set(name,value) },delete:name => values.delete(name) },
    fetch:async (input,init) => { calls.push({url:String(input),init});return Response.json(session()) },
  }
  const request = (pathname,method="GET",body,extra={}) => {
    event.url = new URL(pathname,"https://studio.example.test")
    event.request = new Request(event.url,{ method,headers:{ origin:event.url.origin,"content-type":"application/json","x-classhelm-member-action":"1",...extra },...(body === undefined ? {} : {body:JSON.stringify(body)}) })
    return event
  }
  request(url.pathname,"POST",{ email:customer.email,password:"controlled-test-password" })
  return {event,values,writes,calls,headers,request}
}
async function signed_in() {
  const f = fixture(), server = create_studio_server({ organization_slug:slug })
  assert.equal((await server.session_action(f.event)).status,200)
  f.calls.length = 0
  return { ...f,server }
}
const redirect = (status,location) => { throw Object.assign(new Error("Redirect"),{status,location}) }

test("empty studio configuration renders safely and never contacts an upstream",async () => {
  const server = create_studio_server(),f = fixture()
  f.event.fetch = () => assert.fail("unconfigured transport must not run")
  await server.restore(f.event)
  assert.equal(server.public_config.configured,false)
  assert.equal(server.public_config.studio_href,null)
  assert.deepEqual(await server.load_account(f.event,{redirect}),{member:null,profile:null,experience:null})
  for (const handler of [server.session_action,server.handlers.experience.GET,server.handlers.experience.PATCH,server.handlers.feedback.GET,server.handlers.feedback.PUT,server.handlers.goal_options.GET]) {
    const response = await handler(f.event)
    assert.equal(response.status,503)
    assert.equal(response.headers.get("cache-control"),"private, no-store")
  }
})
test("configuration uses an exact studio and a trusted origin, and projects no secret",() => {
  for (const config of [{organization_slug:"Studio"},{organization_slug:"../abcdefgh"},{organization_slug:slug,api_origin:"http://example.test"},{organization_slug:slug,api_origin:"https://user:password@example.test"},{organization_slug:slug,api_origin:"https://example.test/api"}]) assert.throws(() => create_studio_server(config))
  const config = create_studio_server({organization_slug:slug,storefront_shared_secret:"private-config-only"}).public_config
  assert.deepEqual(config,{configured:true,organization_slug:slug,studio_href:`https://www.classhelm.com/o/${slug}`,schedule_href:`https://www.classhelm.com/o/${slug}/schedule`})
  assert.doesNotMatch(JSON.stringify(config),/private-config|secret|token|api_origin/u)
})
test("actual shared login preserves secure studio cookies and display-only identity",async () => {
  const f = fixture(),server = create_studio_server({organization_slug:slug})
  const response = await server.session_action(f.event),body = await response.json()
  assert.deepEqual(body,{ok:true,customer})
  assert.equal(response.headers.get("cache-control"),"private, no-store")
  assert.equal(f.calls[0].url,`https://www.classhelm.com/api/v1/o/${slug}/member/auth/sign-in`)
  assert.equal(f.writes.length,4)
  assert(f.writes.every(row => row.name.startsWith(`__Host-classhelm-${slug}-member-`) && row.options.httpOnly && row.options.secure && row.options.sameSite === "lax" && row.options.path === "/"))
  assert.deepEqual(public_member({...f.event.locals,member_access_token:"private-token"}),customer)
  assert.doesNotMatch(JSON.stringify(body),/token/u)
})
test("login rejects cross-origin actions, missing action headers and caller studio fields before transport",async () => {
  const server = create_studio_server({organization_slug:slug})
  for (const headers of [{origin:"https://foreign.example.test"},{"x-classhelm-member-action":""},{"sec-fetch-site":"cross-site"}]) {
    const f = fixture();f.request("/api/member/session/login","POST",{email:customer.email,password:"test"},headers)
    assert.equal((await server.session_action(f.event)).status,403);assert.equal(f.calls.length,0)
  }
  const f = fixture();f.request("/api/member/session/login","POST",{email:customer.email,password:"test",organization_slug:other_slug})
  assert.equal((await server.session_action(f.event)).status,400);assert.equal(f.calls.length,0)
})
test("another studio's login receipt cannot establish cookies",async () => {
  const f = fixture(),server = create_studio_server({organization_slug:slug})
  f.event.fetch = async () => Response.json({...session(),organization_slug:other_slug})
  assert.equal((await server.session_action(f.event)).status,502)
  assert.equal(f.writes.length,0)
})
test("global and other-studio cookies never fall back into this studio account",async () => {
  const f = fixture(),server = create_studio_server({organization_slug:slug})
  f.values.set("classhelm_account_access","global-access")
  f.values.set(`__Host-classhelm-${other_slug}-member-refresh`,"other-access")
  await assert.rejects(server.load_account(f.request("/account"),{redirect}),{status:303,location:"/sign-in"})
  assert.equal(f.calls.length,0)
  assert.equal(f.values.get("classhelm_account_access"),"global-access")
})
test("profile projection rejects the wrong owner and removes unknown upstream fields",() => {
  const value = profile();value.profile.private_notes = "private";value.access_token = "private"
  assert.deepEqual(project_member_profile(value,member_id),profile().profile)
  assert.equal(project_member_profile(value,booking_id),null)
  assert.equal(project_member_profile({...value,api_version:2},member_id),null)
})
test("actual account loader consumes studio-bound cookies, preserves private headers and reads sequentially",async () => {
  const f = await signed_in();f.event.locals = {}
  f.event.fetch = async (url,init) => { f.calls.push({url:String(url),init});assert.equal(init.headers.get("authorization"),`Bearer ${session().access_token}`);return Response.json(String(url).endsWith("/profile") ? profile() : experience()) }
  const result = await f.server.load_account(f.request("/account"),{redirect})
  assert.deepEqual(result.member,customer);assert.deepEqual(result.profile,profile().profile);assert.deepEqual(result.experience,experience())
  assert.deepEqual(f.calls.map(row => new URL(row.url).pathname),[`/api/v1/o/${slug}/member/profile`,`/api/v1/o/${slug}/member/experience`])
  assert.equal(f.headers["cache-control"],"private, no-store");assert.equal(f.headers.vary,"Cookie")
  assert.doesNotMatch(JSON.stringify(result),/controlled-access|controlled-refresh/u)
})
test("account denial discards private reads instead of retaining a partial authorized page",async () => {
  const f = await signed_in()
  f.event.fetch = async url => Response.json(String(url).endsWith("/profile") ? profile() : {message:"Denied"},{status:String(url).endsWith("/profile") ? 200 : 403})
  await assert.rejects(f.server.load_account(f.request("/account"),{redirect}),{status:303,location:"/sign-in"})
})
test("shared settings handler enforces mutation headers and strict canonical payloads",async () => {
  const f = await signed_in(),changes = {goals:{tags:["recovery"],text:null,challenge:null,status:"saved"}}
  f.event.fetch = async (url,init) => { f.calls.push({url:String(url),init});return Response.json(experience()) }
  assert.equal((await f.server.handlers.experience.PATCH(f.request("/api/member/experience","PATCH",changes,{"x-classhelm-member-action":""}))).status,403)
  assert.equal((await f.server.handlers.experience.PATCH(f.request("/api/member/experience","PATCH",{...changes,customer_id:member_id}))).status,400)
  assert.equal(f.calls.length,0)
  const response = await f.server.handlers.experience.PATCH(f.request("/api/member/experience","PATCH",changes))
  assert.equal(response.status,200);assert.deepEqual(JSON.parse(f.calls[0].init.body),changes)
  assert.equal(f.calls[0].url,`https://www.classhelm.com/api/v1/o/${slug}/member/experience`)
  assert.equal(response.headers.get("cache-control"),"private, no-store")
})
test("wrong-owner and wrong-studio settings receipts are rejected before reaching the browser",async () => {
  for (const body of [{...experience(),customer_id:booking_id},{...experience(),organization:{...experience().organization,slug:other_slug}},{...experience(),access_token:"private"}]) {
    const f = await signed_in();f.event.fetch = async () => Response.json(body)
    const response = await f.server.handlers.experience.GET(f.request("/api/member/experience"))
    assert.equal(response.status,502);assert.doesNotMatch(JSON.stringify(await response.json()),/private|Test studio/u)
  }
})
test("studio goal choices use only this studio's authenticated route and reject query or tenant substitution",async () => {
  const f=await signed_in(),options={api_version:1,organization:{id:member_id,slug},options:[{id:"community",label:"Community"}],show_challenge:true,revision:2}
  f.event.fetch=async(url,init)=>{f.calls.push({url:String(url),init});return Response.json(options)}
  const response=await f.server.handlers.goal_options.GET(f.request("/api/member/goal-options"))
  assert.equal(response.status,200);assert.deepEqual(await response.json(),options)
  assert.equal(f.calls[0].url,`https://www.classhelm.com/api/v1/o/${slug}/member/goal-options`)
  assert.equal(response.headers.get("cache-control"),"private, no-store")
  assert.equal((await f.server.handlers.goal_options.GET(f.request(`/api/member/goal-options?organization_slug=${other_slug}`))).status,400)
  assert.equal(f.calls.length,1)
  f.event.fetch=async()=>Response.json({...options,organization:{id:member_id,slug:other_slug}})
  assert.equal((await f.server.handlers.goal_options.GET(f.request("/api/member/goal-options"))).status,502)
  const anonymous=fixture();anonymous.values.set("classhelm_account_access","global-only")
  const server=create_studio_server({organization_slug:slug})
  assert.equal((await server.handlers.goal_options.GET(anonymous.request("/api/member/goal-options"))).status,401)
  assert.equal(anonymous.calls.length,0)
})
test("feedback pagination permits only the validated cursor on the fixed member path",async () => {
  const f = await signed_in();f.event.fetch = async (url,init) => { f.calls.push({url:String(url),init});return Response.json({api_version:1,items:[],next_cursor:null}) }
  const query = new URLSearchParams({before_ends_at:"2026-09-01T10:00:00Z",before_booking_id:booking_id})
  assert.equal((await f.server.handlers.feedback.GET(f.request(`/api/member/class-feedback?${query}`))).status,200)
  assert.equal(new URL(f.calls[0].url).pathname,`/api/v1/o/${slug}/member/class-feedback`)
  assert.equal(new URL(f.calls[0].url).searchParams.toString(),query.toString())
  for (const query of ["customer_id=other","before_booking_id=bad","before_ends_at=bad&before_booking_id=bad"]) assert.equal((await f.server.handlers.feedback.GET(f.request(`/api/member/class-feedback?${query}`))).status,400)
  assert.equal(f.calls.length,1)
})
test("feedback saves require a matched booking receipt and never proxy a caller-selected member",async () => {
  const f = await signed_in(),body = {text:"A helpful class",rating:null}
  f.event.params.booking_id = booking_id
  f.event.fetch = async (url,init) => { f.calls.push({url:String(url),init});return Response.json(feedback()) }
  assert.equal((await f.server.handlers.feedback.PUT(f.request(`/api/member/class-feedback/${booking_id}`,"PUT",body))).status,200)
  assert.equal(f.calls[0].url,`https://www.classhelm.com/api/v1/o/${slug}/member/class-feedback/${booking_id}`)
  assert.deepEqual(JSON.parse(f.calls[0].init.body),body)
  f.event.fetch = async () => Response.json({...feedback(),booking_id:member_id})
  assert.equal((await f.server.handlers.feedback.PUT(f.request(`/api/member/class-feedback/${booking_id}`,"PUT",body))).status,502)
})
test("private headers preserve existing Vary values and anonymous marketing stays public",() => {
  for (const pathname of ["/account","/sign-in","/api/member/experience"]) {
    const response = secure_site_response(new Response("ok",{headers:{vary:"Accept-Encoding"}}),{url:new URL(pathname,"https://studio.example.test"),locals:{}})
    assert.equal(response.headers.get("cache-control"),"private, no-store")
    assert.equal(response.headers.get("vary"),"Accept-Encoding, Cookie")
    assert.equal(response.headers.get("referrer-policy"),"no-referrer")
  }
  const response = secure_site_response(new Response("ok"),{url:new URL("https://studio.example.test"),locals:{}})
  assert.equal(response.headers.get("referrer-policy"),"strict-origin");assert.equal(response.headers.get("cache-control"),null)
})
test("theme cookie cannot inject markup",() => {
  for (const [value,theme] of [[undefined,"light"],["light","light"],["dark","dark"],['dark" onclick="bad',"light"]]) assert.equal(transform_theme('<html data-theme="">',value),`<html data-theme="${theme}">`)
})
test("analytics collects only approved public pages and strips personal URL properties",() => {
  const filter = create_public_page_analytics({public_paths:["/"]})
  assert.equal(filter({type:"pageview",url:"https://studio.example.test/account"}),null)
  assert.equal(filter({type:"pageview",url:"https://studio.example.test/sign-in?email=member@example.test"}),null)
  const result = filter({type:"pageview",url:"https://studio.example.test/?token=private#secret",referrer:"private",properties:{email:"private"}})
  assert.deepEqual(result,{type:"pageview",url:"https://studio.example.test/"})
})
