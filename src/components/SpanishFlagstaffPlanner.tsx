import React from 'react';
import SharePlanPanel from './SharePlanPanel';

import plans from '../data/spanishFlagstaffPlans.json';

export default function SpanishFlagstaffPlanner() {
  const [choice, setChoice] = React.useState(0);
  const [saved, setSaved] = React.useState(false);
  const plan = plans[choice];
  const text = [`Flagstaff con niños — ${plan.title}`, '', ...plan.steps.map((step, index) => `${index + 1}. ${step}`), '', 'Lleven agua, capas de ropa, comida y protección solar. Revisen los enlaces oficiales de la guía antes de salir; este plan no confirma disponibilidad ni condiciones actuales.', '', 'Guía: https://sage.healthandtravels.com/es/arizona/flagstaff-con-ninos'].join('\n');
  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plan-familiar-flagstaff.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSaved(true);
  };

  return <section id="plan-familiar" className="scroll-mt-6 border-y border-teal-100 bg-teal-50 px-5 py-12 sm:px-6" aria-labelledby="flagstaff-plan-title">
    <div className="mx-auto max-w-4xl">
      <h2 id="flagstaff-plan-title" tabIndex={-1} className="text-2xl font-black tracking-tight sm:text-3xl">Tu plan familiar para Flagstaff</h2>
      <p className="mt-3 leading-7">Elige un ritmo y guarda una propuesta en español. No necesitas una cuenta. Puedes compartirla con tu familia y adaptarla antes de salir.</p>
      <label htmlFor="flagstaff-trip-style" className="mt-6 block font-bold">¿Qué tipo de visita quieren?</label>
      <select id="flagstaff-trip-style" value={choice} onChange={(event) => { setChoice(Number(event.target.value)); setSaved(false); }} className="mt-2 min-h-12 w-full rounded-xl border border-teal-700 bg-white p-3 text-base">
        {plans.map((item, index) => <option key={item.title} value={index}>{item.title}</option>)}
      </select>
      <div className="mt-6 rounded-xl border border-teal-200 bg-white p-5" aria-live="polite" aria-atomic="true">
        <h3 className="text-xl font-bold">{plan.title}</h3>
        <ol className="mt-4 list-decimal space-y-4 pl-5 leading-7">{plan.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </div>
      <p className="mt-4 text-sm leading-6">Lleven agua, capas de ropa, comida y protección solar. Revisen los enlaces oficiales de esta guía antes de salir: este plan no confirma disponibilidad ni condiciones actuales.</p>
      <button type="button" onClick={download} className="mt-5 min-h-12 w-full rounded-full bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800 sm:w-auto">Descargar mi plan (.txt)</button>
      <p role="status" className="mt-2 text-sm">{saved ? 'Descarga solicitada. Busca plan-familiar-flagstaff.txt en las descargas de tu dispositivo.' : 'El archivo incluye el plan completo y el enlace a esta guía.'}</p>
    </div>
    <SharePlanPanel title="Comparte tu plan" description="Copia la propuesta elegida o envía el enlace de la guía." quickPlanText={text} voteText={'¿Qué hacemos en Flagstaff?\n1. Un día tranquilo\n2. Bosque y estrellas\n3. Fin de semana flexible\nhttps://sage.healthandtravels.com/es/arizona/flagstaff-con-ninos#plan-familiar'} eventContext="spanish_flagstaff_planner" locale="es" />
  </section>;
}
