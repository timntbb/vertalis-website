"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

type FormState = { name:string; email:string; phone:string; company:string; companyWebsite:string; matterType:string; details:string; website:string };
const initialForm:FormState={name:"",email:"",phone:"",company:"",companyWebsite:"",matterType:"",details:"",website:""};

function BookingCalendar({name,email}:{name:string;email:string}) {
  useEffect(()=>{void (async()=>{const cal=await getCalApi({namespace:"legal-consultation"});cal("ui",{theme:"dark",cssVarsPerTheme:{light:{"cal-brand":"#B65E2E"},dark:{"cal-brand":"#B65E2E"}},hideEventTypeDetails:true,layout:"month_view"});})();},[]);
  return <div className="min-h-[760px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0d]"><Cal key={`${name}|${email}`} namespace="legal-consultation" calLink="vertalislc/legal-consultation" style={{width:"100%",height:"760px",overflow:"scroll"}} config={{layout:"month_view",useSlotsViewOnSmallScreen:"true",theme:"dark",...(name?{name}:{}),...(email?{email}:{})}} /></div>;
}

export default function ConsultationClient(){
  const [view,setView]=useState<"conversation"|"schedule">("conversation");
  const [form,setForm]=useState<FormState>(initialForm);
  const [submitting,setSubmitting]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState("");
  const update=(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{setForm(previous=>({...previous,[event.target.name]:event.target.value}));setError("");};
  const send=async(schedule:boolean)=>{
    setError("");
    if(!form.name.trim()||!form.email.trim()||!form.phone.trim()||!form.company.trim()||!form.matterType||!form.details.trim()){setError("Please complete all required fields.");return;}
    setSubmitting(true);
    try{
      const message=[`Phone: ${form.phone}`,`Matter type: ${form.matterType}`,form.companyWebsite?`Company website: ${form.companyWebsite}`:"",`Message:\n${form.details}`].filter(Boolean).join("\n\n");
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:form.name,email:form.email,company:form.company,message,website:form.website})});
      const data=await response.json();
      if(!response.ok)throw new Error(data?.error||"Unable to send your message.");
      setSubmitted(true);
      if(schedule)setView("schedule");
    }catch(caught){setError(caught instanceof Error?caught.message:"Unable to send your message.");}finally{setSubmitting(false);}
  };

  const inputClass="mt-2 w-full rounded-[18px] border border-white/10 bg-white/[0.035] px-4 py-3.5 text-white outline-none placeholder:text-white/25 transition focus:border-[#c06020]/70 focus:bg-white/[0.05]";
  return <section className="py-10 md:py-14"><div className="mx-auto w-full max-w-6xl px-6">{view==="conversation"?<div className="mx-auto mt-8 max-w-4xl"><div className="rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012))] p-5 shadow-[0_22px_60px_-42px_#000] md:p-7"><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold text-white/85">Full name<input className={inputClass} name="name" value={form.name} onChange={update} autoComplete="name" required/></label><label className="text-sm font-semibold text-white/85">Email<input className={inputClass} name="email" type="email" value={form.email} onChange={update} autoComplete="email" required/></label><label className="text-sm font-semibold text-white/85">Phone<input className={inputClass} name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" required/></label><label className="text-sm font-semibold text-white/85">Company name<input className={inputClass} name="company" value={form.company} onChange={update} autoComplete="organization" required/></label><label className="text-sm font-semibold text-white/85 md:col-span-2">Company website <span className="font-normal text-white/35">(optional)</span><input className={inputClass} name="companyWebsite" type="url" value={form.companyWebsite} onChange={update} autoComplete="url" placeholder="https://"/></label><label className="text-sm font-semibold text-white/85 md:col-span-2">General matter type<select className={inputClass} name="matterType" value={form.matterType} onChange={update} required><option value="" disabled>Select a matter type</option>{["Company & Ownership","Contracts & Transactions","People & Operations","Growth & Capital","Business Disputes","Ongoing / Outside General Counsel","Other"].map(option=><option key={option}>{option}</option>)}</select></label><label className="text-sm font-semibold text-white/85 md:col-span-2">Briefly, what would you like to discuss?<textarea className={`${inputClass} min-h-32 resize-y`} name="details" value={form.details} onChange={update} required/></label><div className="hidden" aria-hidden="true"><label>Website<input name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off"/></label></div></div><p className="mt-5 border-l-2 border-[#c06020] bg-[#c06020]/[0.08] px-4 py-3 text-xs leading-6 text-white/48">Please do not submit confidential or sensitive information. Contacting Vertalis Legal Counsel or scheduling a free consultation does not create an attorney-client relationship.</p>{error&&<p role="alert" className="mt-4 rounded-[16px] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}{submitted&&<p role="status" className="mt-4 rounded-[16px] border border-[#c06020]/25 bg-[#c06020]/10 px-4 py-3 text-sm text-[#efb184]">Your message has been sent to Vertalis.</p>}<div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" disabled={submitting||submitted} onClick={()=>send(false)} className="rounded-[18px] border border-white/14 bg-white/[0.05] px-5 py-4 font-semibold text-white transition hover:bg-white/[0.09] disabled:opacity-60">{submitting?"Sending...":"Send Message"}</button><button type="button" disabled={submitting} onClick={()=>send(true)} className="rounded-[18px] bg-gradient-to-b from-[#de8a46] to-[#c06020] px-5 py-4 font-semibold text-white shadow-[0_14px_34px_rgba(192,96,32,0.28)] transition hover:brightness-110 disabled:opacity-60">{submitting?"Sending...":"Send & Schedule Free Consultation →"}</button></div></div></div>:<div className="mt-8"><div className="mb-5 text-center"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d66f24]">Choose a time</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Book your free consultation</h2><p className="mt-2 text-sm text-white/50">{form.name&&form.email?`Your name and email are prefilled for ${form.name}.`:"Select an available time without leaving this page."}</p></div><BookingCalendar name={form.name} email={form.email}/></div>}</div></section>;
}
