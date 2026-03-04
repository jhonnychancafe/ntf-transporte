import { useState, useMemo, useCallback, useEffect } from "react";
const TODAY=new Date().toISOString().slice(0,10);
const n2=v=>v?.toFixed(2)??"—";
const fD=d=>d?new Date(d+"T12:00:00").toLocaleDateString("es-PE",{day:"2-digit",month:"short",year:"numeric"}):"—";
const fN=v=>v!=null?v.toLocaleString("es-PE",{minimumFractionDigits:2,maximumFractionDigits:2}):"—";
const fS=v=>"S/ "+fN(v);
const LOGO="data:image/png;base64,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";
const UNI_I=[{id:1,pl:"ARR-903",mk:"INTL"},{id:4,pl:"ATW-887",mk:"INTL"},{id:6,pl:"X2C-881",mk:"VOLVO"},{id:8,pl:"V8J-827",mk:"INTL"},{id:9,pl:"ARF-761",mk:"VOLVO"},{id:17,pl:"ATS-900",mk:"VOLVO"},{id:27,pl:"AEV-885",mk:"KENW"},{id:28,pl:"ARX-819",mk:"FREIGHT"},{id:29,pl:"AUU-877",mk:"KENW"},{id:31,pl:"T9H-800",mk:"FREIGHT"}];
const SEMI_I=[{id:1,pl:"T3S-001",tipo:"PLATAFORMA"},{id:2,pl:"T3S-002",tipo:"FURGON"},{id:3,pl:"T3S-003",tipo:"CAMA_BAJA"},{id:4,pl:"T3S-004",tipo:"PLATAFORMA"},{id:5,pl:"T3S-005",tipo:"TOLVA"}];
const COND_I=[{id:1,nm:"HIDALGO V."},{id:2,nm:"FLORES V."},{id:3,nm:"GAMBOA B."},{id:4,nm:"MACHA E."},{id:5,nm:"ZAPATA G."},{id:6,nm:"VALDIVIEZO Y."},{id:7,nm:"VILLANUEVA T."},{id:8,nm:"SANCHEZ C."}];
const RUTAS_I=[{id:1,c:"CHI-GYQ",o:"Chiclayo",d:"Guayaquil",tp:"INTL",km:980},{id:2,c:"CHI-BOG",o:"Chiclayo",d:"Bogotá",tp:"INTL",km:2850},{id:3,c:"LIM-CHI",o:"Lima",d:"Chiclayo",tp:"LOCAL",km:770},{id:5,c:"LIM-TRU",o:"Lima",d:"Trujillo",tp:"LOCAL",km:560},{id:8,c:"CHI-LIM",o:"Chiclayo",d:"Lima",tp:"LOCAL",km:770}];
const CLI_I=[{id:1,rs:"Agroindustrias AIB",ruc:"20100055237",pa:"PE"},{id:2,rs:"Cementos Pacasmayo",ruc:"20419387658",pa:"PE"},{id:4,rs:"TransAndina Ecuador",ruc:"0992847561001",pa:"EC"},{id:5,rs:"Distrib. Nal. Colombia",ruc:"900456789-1",pa:"CO"},{id:6,rs:"Minera Yanacocha",ruc:"20137291313",pa:"PE"}];
const CATS_G=["Comb.Local","Comb.Ecuador","Peaje","Alimentación","Hospedaje","Aduana","Mantenimiento","Repuestos","Estiba","Comisiones","Lavado","Guardianía","Otros"];
const TDOCS=["FACTURA","FACT_EXT","BOLETA","RECIBO","TICKET","VALE","SIN_DOC"];
const CAJAS_I=[{id:1,nm:"Caja Chica",tipo:"CAJA",saldo:15000,saldoUsd:500},{id:2,nm:"Caja Principal",tipo:"CAJA",saldo:85000,saldoUsd:2000},{id:3,nm:"BCP Cta.Cte.",tipo:"BANCO",saldo:120000,saldoUsd:8000},{id:4,nm:"BBVA Cta.Cte.",tipo:"BANCO",saldo:45000,saldoUsd:3000},{id:5,nm:"Banco Nación",tipo:"BANCO",saldo:30000,saldoUsd:0}];
const gU=(id,a)=>a.find(u=>u.id===id),gC=(id,a)=>a.find(c=>c.id===id),gR=(id,a)=>a.find(r=>r.id===id),gCl=(id,a)=>a.find(c=>c.id===id),gSm=(id,a)=>a.find(s=>s.id===id);
const bTP=b=>b.pen+(b.usd*(b.tcUsd||0));
const TDOC_ID=["RUC","DNI","CE","PASAPORTE","RUC_EXT","SIN_DOC"];
const MOVS_I=[{id:1,fecha:"2026-02-10",cId:1,tp:"SALIDA",con:"Bolsa VJ-0001 PEN",ref:"VJ-2026-0001",mon:"PEN",mt:1500},{id:2,fecha:"2026-02-10",cId:1,tp:"SALIDA",con:"Bolsa VJ-0001 USD",ref:"VJ-2026-0001",mon:"USD",mt:500},{id:3,fecha:"2026-02-14",cId:3,tp:"SALIDA",con:"Bolsa VJ-0002 USD",ref:"VJ-2026-0002",mon:"USD",mt:600},{id:4,fecha:"2026-02-18",cId:2,tp:"SALIDA",con:"Bolsa VJ-0003 PEN",ref:"VJ-2026-0003",mon:"PEN",mt:800},{id:5,fecha:"2026-02-12",cId:1,tp:"INGRESO",con:"Dev.saldo VJ-0001",ref:"VJ-2026-0001",mon:"PEN",mt:306}];
const ALM_I=[{id:1,fecha:"2026-02-12",tp:"ENTRADA",gal:120,cuPen:8.89,tot:1066.80,ref:"LOT-001",vjRef:"VJ-2026-0001",uni:null,nota:"Descarga conductor Pérez"},{id:2,fecha:"2026-02-16",tp:"ENTRADA",gal:80,cuPen:9.12,tot:729.60,ref:"LOT-002",vjRef:"VJ-2026-0002",uni:null,nota:"Descarga conductor García"},{id:3,fecha:"2026-02-18",tp:"SALIDA",gal:50,cuPen:8.98,tot:449.00,ref:"DESP-001",vjRef:null,uni:9,nota:"Despacho ruta local Chiclayo-Lima"},{id:4,fecha:"2026-02-20",tp:"SALIDA",gal:30,cuPen:8.98,tot:269.40,ref:"DESP-002",vjRef:null,uni:8,nota:"Despacho ruta local Chiclayo-Trujillo"}];
const COMPRAS_I=[
  {id:1,fecha:"2026-02-10",prov:"PetroEcuador S.A.",tdoc:"FACT_EXT",ndoc:"001-0045892",gal:800,puUsd:2.35,totUsd:1880,tc:3.785,base:7115.80,igv:0,tot:7115.80,cu:8.89,lote:"LOT-001",vjId:1},
  {id:2,fecha:"2026-02-14",prov:"PetroEcuador S.A.",tdoc:"FACT_EXT",ndoc:"001-0045978",gal:900,puUsd:2.38,totUsd:2142,tc:3.792,base:8122.46,igv:0,tot:8122.46,cu:9.03,lote:"LOT-002",vjId:2},
  {id:3,fecha:"2026-02-20",prov:"GasolinExpress GYQ",tdoc:"FACT_EXT",ndoc:"002-0012456",gal:750,puUsd:2.32,totUsd:1740,tc:3.798,base:6608.52,igv:0,tot:6608.52,cu:8.81,lote:"LOT-003",vjId:4},
];
const VJS_I=[
  {id:1,cod:"VJ-2026-0001",fP:"2026-02-10",fS:"2026-02-10",fL:"2026-02-12",tr:4,con:1,ruta:1,cli:4,serv:"INTL",peso:28.5,carga:"Frutas",est:"FINALIZADO",bolsa:{pen:1500,orPen:1,usd:500,orUsd:1,tcUsd:3.785,estLiq:"LIQUIDADO",saldoAccion:"DEVUELTO",saldoDestPen:1,saldoDestUsd:1},
    gastos:[{cat:"Comb.Ecuador",tdoc:"FACT_EXT",ndoc:"001-0045892",prov:"PetroEcuador",mon:"USD",monto:1880,tc:3.785,base:7115.80,igv:0,tot:7115.80},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-001",prov:"Rutas Lima",mon:"PEN",monto:280,tc:1,base:237.29,igv:42.71,tot:280},{cat:"Alimentación",tdoc:"BOLETA",ndoc:"B001-456",prov:"Varios",mon:"PEN",monto:180,tc:1,base:152.54,igv:27.46,tot:180},{cat:"Aduana",tdoc:"RECIBO",ndoc:"ADU-018",prov:"SUNAT",mon:"PEN",monto:350,tc:1,base:350,igv:0,tot:350},{cat:"Hospedaje",tdoc:"FACT_EXT",ndoc:"HGQ-892",prov:"Hotel GYQ",mon:"USD",monto:45,tc:3.785,base:170.33,igv:0,tot:170.33}],
    ingresos:[{tdoc:"FACTURA",serie:"F001",nro:"00234",fecha:"2026-02-13",cli:4,mon:"USD",monto:2500,tc:3.792,base:8033.90,igv:1446.10,tot:9480,estado:"COBRADO",fCobro:"2026-02-20"}]},
  {id:2,cod:"VJ-2026-0002",fP:"2026-02-14",fS:"2026-02-14",fL:"2026-02-17",tr:9,con:3,ruta:1,cli:4,serv:"INTL",peso:24,carga:"Insumos",est:"FINALIZADO",bolsa:{pen:1200,orPen:1,usd:600,orUsd:3,tcUsd:3.792,estLiq:"LIQUIDADO",saldoAccion:"DEVUELTO",saldoDestPen:2,saldoDestUsd:3},
    gastos:[{cat:"Comb.Ecuador",tdoc:"FACT_EXT",ndoc:"001-0045978",prov:"PetroEcuador",mon:"USD",monto:2142,tc:3.792,base:8122.46,igv:0,tot:8122.46},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-002",prov:"Rutas Lima",mon:"PEN",monto:320,tc:1,base:271.19,igv:48.81,tot:320},{cat:"Alimentación",tdoc:"BOLETA",ndoc:"B001-489",prov:"Varios",mon:"PEN",monto:240,tc:1,base:203.39,igv:36.61,tot:240},{cat:"Hospedaje",tdoc:"FACT_EXT",ndoc:"HGQ-910",prov:"Hotel GYQ",mon:"USD",monto:90,tc:3.792,base:341.28,igv:0,tot:341.28}],
    ingresos:[{tdoc:"FACTURA",serie:"F001",nro:"00235",fecha:"2026-02-18",cli:4,mon:"USD",monto:2200,tc:3.798,base:7081.36,igv:1274.64,tot:8355.60,estado:"PENDIENTE",fCobro:null}]},
  {id:3,cod:"VJ-2026-0003",fP:"2026-02-18",fS:"2026-02-18",fL:"2026-02-20",tr:6,con:5,ruta:3,cli:2,serv:"LOCAL",peso:30,carga:"Cemento",est:"FINALIZADO",bolsa:{pen:800,orPen:2,usd:0,orUsd:null,tcUsd:0,estLiq:"LIQUIDADO",saldoAccion:"DEVUELTO",saldoDestPen:2,saldoDestUsd:null},
    gastos:[{cat:"Comb.Local",tdoc:"FACTURA",ndoc:"F040-5672",prov:"Grifo Repsol",mon:"PEN",monto:720,tc:1,base:610.17,igv:109.83,tot:720},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-003",prov:"IIRSA",mon:"PEN",monto:180,tc:1,base:152.54,igv:27.46,tot:180},{cat:"Alimentación",tdoc:"BOLETA",ndoc:"B002-1234",prov:"Varios",mon:"PEN",monto:150,tc:1,base:127.12,igv:22.88,tot:150}],
    ingresos:[{tdoc:"FACTURA",serie:"F001",nro:"00236",fecha:"2026-02-21",cli:2,mon:"PEN",monto:3800,tc:1,base:3220.34,igv:579.66,tot:3800,estado:"COBRADO",fCobro:"2026-02-24"}]},
  {id:4,cod:"VJ-2026-0004",fP:"2026-02-20",fS:"2026-02-20",fL:null,tr:28,con:6,ruta:1,cli:4,serv:"INTL",peso:22,carga:"Mat.Constr.",est:"EN_RUTA",bolsa:{pen:1000,orPen:1,usd:450,orUsd:3,tcUsd:3.798,estLiq:"EN_PROCESO"},
    gastos:[{cat:"Comb.Ecuador",tdoc:"FACT_EXT",ndoc:"002-0012456",prov:"GasolinExpress",mon:"USD",monto:1740,tc:3.798,base:6608.52,igv:0,tot:6608.52},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-004",prov:"IIRSA",mon:"PEN",monto:280,tc:1,base:237.29,igv:42.71,tot:280}],
    ingresos:[{tdoc:"DOC_INTERNO",serie:"DI",nro:"00015",fecha:"2026-02-20",cli:4,mon:"USD",monto:1800,tc:3.798,base:5793.56,igv:0,tot:6836.40,estado:"PEND_FACTURAR",fCobro:null}]},
  {id:5,cod:"VJ-2026-0005",fP:"2026-02-26",fS:null,fL:null,tr:17,con:7,ruta:2,cli:5,serv:"INTL",peso:25,carga:"Equipos",est:"PROGRAMADO",bolsa:{pen:0,orPen:null,usd:0,orUsd:null,tcUsd:0,estLiq:"PENDIENTE"},gastos:[],
    ingresos:[{tdoc:"DOC_INTERNO",serie:"DI",nro:"00016",fecha:null,cli:5,mon:"USD",monto:3200,tc:3.798,base:10316.95,igv:0,tot:12153.60,estado:"PEND_FACTURAR",fCobro:null}]},
  {id:6,cod:"VJ-2026-0006",fP:"2026-02-28",fS:null,fL:null,tr:8,con:4,ruta:8,cli:6,serv:"LOCAL",peso:32,carga:"Eq.Mineros",est:"PROGRAMADO",bolsa:{pen:0,orPen:null,usd:0,orUsd:null,tcUsd:0,estLiq:"PENDIENTE"},gastos:[],ingresos:[]},
];
const DOCS_I=[{id:1,tipo:"GUIA_REM",nro:"T001-125",fecha:"2026-02-10",ent:"NTF",ref:"VJ-0001",desc:"Guía CHI-GYQ",arch:"GR_125.pdf"},{id:2,tipo:"FACT_EXT",nro:"001-045892",fecha:"2026-02-10",ent:"PetroEcuador",ref:"LOT-001",desc:"Fact.comb.Ecuador",arch:"FACT_892.pdf"},{id:3,tipo:"FACTURA",nro:"F001-00234",fecha:"2026-02-13",ent:"NTF→TransAndina",ref:"VJ-0001",desc:"Fact.transporte",arch:"F001-234.pdf"},{id:4,tipo:"FACTURA",nro:"F001-00235",fecha:"2026-02-18",ent:"NTF→TransAndina",ref:"VJ-0002",desc:"Fact.transporte",arch:"F001-235.pdf"},{id:5,tipo:"FACTURA",nro:"F001-00236",fecha:"2026-02-21",ent:"NTF→Cementos",ref:"VJ-0003",desc:"Fact.local",arch:"F001-236.pdf"},{id:6,tipo:"DOC_INT",nro:"DI-00015",fecha:"2026-02-20",ent:"NTF int.",ref:"VJ-0004",desc:"Pend.facturar",arch:null},{id:7,tipo:"BOLETA",nro:"B001-456",fecha:"2026-02-11",ent:"Varios",ref:"VJ-0001",desc:"Alimentación",arch:"BOL_456.jpg"}];
const KCOLS=[{k:"PROGRAMADO",l:"Programado",i:"📋",c:"#818CF8"},{k:"ESPERA_CARGA",l:"Espera Carga",i:"⏳",c:"#A78BFA"},{k:"EN_RUTA",l:"En Ruta",i:"🚛",c:"#F59E0B"},{k:"MANTENIMIENTO",l:"Mantenimiento",i:"🔧",c:"#F87171"},{k:"SIN_MOVIMIENTO",l:"Sin Movimiento",i:"⛔",c:"#6B7280"},{k:"FINALIZADO",l:"Finalizado",i:"✅",c:"#34D399"},{k:"CANCELADO",l:"Cancelado",i:"❌",c:"#991B1B"}];
function calcL(v,rutas){const tG=v.gastos.reduce((s,g)=>s+g.base,0),tGI=v.gastos.reduce((s,g)=>s+g.tot,0),cP=v.gastos.filter(g=>g.cat.includes("Comb")).reduce((s,g)=>s+g.tot,0),tI=v.ingresos.reduce((s,i)=>s+i.base,0),tIB=v.ingresos.reduce((s,i)=>s+i.tot,0),rt=gR(v.ruta,rutas),m=tI-tG,p=tI>0?(m/tI*100):0;return{tG,tGI,tI,tIB,cP,m,p,ck:rt?.km>0?tG/rt.km:0,ct:v.peso>0?tG/v.peso:0,pF:v.ingresos.filter(i=>i.estado==="PEND_FACTURAR"),pC:v.ingresos.filter(i=>i.estado==="PENDIENTE"),km:rt?.km||0}}
export default function App(){


// ── Toasts simples (sin librerías)
const [toasts,setToasts]=useState([]);
const toast=useCallback((msg)=>{
  const id=Date.now()+Math.random();
  setToasts(t=>[...t,{id,msg}]);
  setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2600);
},[]);

const useLS=(k,init)=>{
  const [v,setV]=useState(()=>{
    try{
      const raw=localStorage.getItem(k);
      return raw?JSON.parse(raw):init;
    }catch(e){return init;}
  });
  useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}},[k,v]);
  return [v,setV];
};
  const [view,setView]=useState("dashboard");
  const [viajes,setViajes]=useLS("ntf_viajes",VJS_I);
  const [unis,setUnis]=useLS("ntf_unis",UNI_I);
  const [semis,setSemis]=useLS("ntf_semis",SEMI_I);
  const [conds,setConds]=useLS("ntf_conds",COND_I);
  const [rutas,setRutas]=useLS("ntf_rutas",RUTAS_I);
  const [clis,setClis]=useLS("ntf_clis",CLI_I);
  const [cajas,setCajas]=useLS("ntf_cajas",CAJAS_I);
  const [movs,setMovs]=useLS("ntf_movs",MOVS_I);
  const [cajaDetId,setCajaDetId]=useState(null);
  const [movModal,setMovModal]=useState(null);
  const [combModal,setCombModal]=useState(null);
  const [docModal,setDocModal]=useState(null);
  const [almMov,setAlmMov]=useLS("ntf_almMov",ALM_I);
  const [almModal,setAlmModal]=useState(null);
  const [combTab,setCombTab]=useState("compras");
  const [compras,setCompras]=useLS("ntf_compras",COMPRAS_I);
  const [docs,setDocs]=useLS("ntf_docs",DOCS_I);

// ─────────────────────────────────────────────────────────────
// Gestión documentaria (Semáforo) — Tractos y Semirremolques
// docTypesCtrl: tipos de documentos a controlar (configurable)
// docCtrl: registros por unidad (tracto/semi) y tipo de doc
const DOC_TYPES_CTRL_I=[
  {c:"soat",n:"SOAT",w:30},
  {c:"poliza_andina",n:"Póliza Andina",w:30},
  {c:"rev_tecnica",n:"Rev. Técnica",w:30},
  {c:"tarj_andina",n:"Tarj. Andina",w:30},
  {c:"mtc",n:"MTC",w:30},
  {c:"bonificacion",n:"Bonificación",w:30},
  {c:"seguro_carga",n:"Seguro de Carga",w:30},
  {c:"rev_tecnica_matpel",n:"Rev. Técnica MATPEL",w:30},
];
const [docTypesCtrl,setDocTypesCtrl]=useLS("ntf_docTypesCtrl",DOC_TYPES_CTRL_I);
const [docCtrl,setDocCtrl]=useLS("ntf_docCtrl",{}); // { "<T|S>:<id>": { [docCode]: { venc:"YYYY-MM-DD", nro:"", obs:"" } } }
const [docTypeModal,setDocTypeModal]=useState(false);
const [unitModal,setUnitModal]=useState(false);
const [docEdit,setDocEdit]=useState(null); // {key, unitLabel, docType}

const [unitTab,setUnitTab]=useState("tractos");
const [newTrPl,setNewTrPl]=useState("");
const [newTrMk,setNewTrMk]=useState("");
const [newSePl,setNewSePl]=useState("");
const [newSeTipo,setNewSeTipo]=useState("");
const [newDocTypeName,setNewDocTypeName]=useState("");
const [newDocTypeWarn,setNewDocTypeWarn]=useState(30);
const [docForm,setDocForm]=useState({venc:"",nro:"",obs:"",file:null});

useEffect(()=>{
  if(!docEdit) return;
  const {key,docType}=docEdit;
  const cur=((docCtrl[key]||{})[docType.c])||{venc:"",nro:"",obs:""};
  setDocForm({venc:cur.venc||"",nro:cur.nro||"",obs:cur.obs||"",file:cur.file||null});
},[docEdit]); 
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("resumen");
  const [cfm,setCfm]=useState(null);
  const [vjModal,setVjModal]=useState(null);
  const [vjTab,setVjTab]=useState("general");
  const [quickAdd,setQuickAdd]=useState(null);
  const [cajaModal,setCajaModal]=useState(null);
  const [gastoModal,setGastoModal]=useState(null); // {vjId, gasto?:existing, idx?}
  const [liqSel,setLiqSel]=useState(null); // viaje id for liquidacion detail
  const [bolsaModal,setBolsaModal]=useState(null); // {vjId} for assigning bolsa origin
  const [saldoModal,setSaldoModal]=useState(null); // {vjId, saldo} for closing liquidacion
  const nxId=(arr)=>Math.max(0,...arr.map(x=>x.id))+1;
  const addUni=(u)=>{const id=nxId(unis);setUnis(p=>[...p,{...u,id}]);setQuickAdd(null);return id};
  const addSemi=(s)=>{const id=nxId(semis);setSemis(p=>[...p,{...s,id}]);setQuickAdd(null);return id};
  const addCond=(c)=>{const id=nxId(conds);setConds(p=>[...p,{...c,id}]);setQuickAdd(null);return id};
  const addRuta=(r)=>{const id=nxId(rutas);setRutas(p=>[...p,{...r,id}]);setQuickAdd(null);return id};
  const addCli=(c)=>{const id=nxId(clis);setClis(p=>[...p,{...c,id}]);setQuickAdd(null);return id};
  const addGasto=(vjId,g)=>setViajes(p=>p.map(v=>v.id===vjId?{...v,gastos:[...v.gastos,g],bolsa:{...v.bolsa,estLiq:v.bolsa.estLiq==="PENDIENTE"?"EN_PROCESO":v.bolsa.estLiq}}:v));
  const updGasto=(vjId,idx,g)=>setViajes(p=>p.map(v=>v.id===vjId?{...v,gastos:v.gastos.map((x,i)=>i===idx?g:x)}:v));
  const delGasto=(vjId,idx)=>setViajes(p=>p.map(v=>v.id===vjId?{...v,gastos:v.gastos.filter((_,i)=>i!==idx)}:v));
  const setBolsaOrigen=(vjId,orPen,pen,orUsd,usd,tc)=>setViajes(p=>p.map(v=>v.id===vjId?{...v,bolsa:{...v.bolsa,pen,orPen,usd,orUsd,tcUsd:tc,estLiq:v.bolsa.estLiq==="PENDIENTE"?"EN_PROCESO":v.bolsa.estLiq}}:v));
  const cerrarLiq=(vjId,accionPen,destPenId,accionUsd,destUsdId)=>{setViajes(p=>p.map(v=>{if(v.id!==vjId)return v;
    const gPen=v.gastos.filter(g=>g.mon==="PEN").reduce((s,g)=>s+g.tot,0),gUsd=v.gastos.filter(g=>g.mon!=="PEN").reduce((s,g)=>s+g.monto,0);
    const saldoPen=v.bolsa.pen-gPen,saldoUsd=v.bolsa.usd-gUsd;
    if(accionPen==="DEVUELTO"&&destPenId&&saldoPen>0){setCajas(c=>c.map(x=>x.id===destPenId?{...x,saldo:x.saldo+saldoPen}:x))}
    if(accionUsd==="DEVUELTO"&&destUsdId&&saldoUsd>0){setCajas(c=>c.map(x=>x.id===destUsdId?{...x,saldoUsd:(x.saldoUsd||0)+saldoUsd}:x))}
    return{...v,bolsa:{...v.bolsa,estLiq:"LIQUIDADO",saldoAccion:accionPen,saldoDestPen:destPenId,saldoAccionUsd:accionUsd,saldoDestUsd:destUsdId}}}));
    setSaldoModal(null)};
  const addCaja=(nm,tipo)=>{const id=nxId(cajas);setCajas(p=>[...p,{id,nm,tipo:tipo||"CAJA",saldo:0,saldoUsd:0}]);return id};
  const regMov=(cId,tp,con,ref,mon,mt)=>{const c=cajas.find(x=>x.id===cId);if(!c)return;const id=nxId(movs);const f=new Date().toISOString().slice(0,10);setMovs(p=>[{id,fecha:f,cId,tp,con,ref,mon,mt},...p]);setCajas(p=>p.map(x=>x.id===cId?(mon==="USD"?{...x,saldoUsd:tp==="INGRESO"?(x.saldoUsd||0)+mt:(x.saldoUsd||0)-mt}:{...x,saldo:tp==="INGRESO"?x.saldo+mt:x.saldo-mt}):x))};
  const saveComb=(d,ed,idx)=>{if(ed){setCompras(p=>p.map((c,i)=>i===idx?{...c,...d}:c))}else{setCompras(p=>[...p,{...d,id:nxId(compras)}])}setCombModal(null)};
  const saveDoc=(d,ed,idx)=>{if(ed){setDocs(p=>p.map((x,i)=>i===idx?{...x,...d}:x))}else{setDocs(p=>[...p,{...d,id:nxId(docs)}])}setDocModal(null)};
  const emitFact=(vjId,iIdx)=>setViajes(p=>p.map(v=>v.id===vjId?{...v,ingresos:v.ingresos.map((ing,i)=>i===iIdx?{...ing,tdoc:"FACTURA",serie:ing.serie||"F001",nro:ing.nro||String(nxId(docs)).padStart(5,"0"),estado:"PENDIENTE",fecha:TODAY}:ing)}:v));
  const regCobro=(vjId,iIdx)=>setViajes(p=>p.map(v=>v.id===vjId?{...v,ingresos:v.ingresos.map((ing,i)=>i===iIdx?{...ing,estado:"COBRADO",fCobro:TODAY}:ing)}:v));
  const almStock=useMemo(()=>{let stk=0,val=0;almMov.sort((a,b)=>a.id-b.id).forEach(m=>{if(m.tp==="ENTRADA"){val+=m.gal*m.cuPen;stk+=m.gal}else{const cu=stk>0?val/stk:0;val-=m.gal*cu;stk-=m.gal}});return{stk:Math.round(stk*100)/100,val:Math.round(val*100)/100,cu:stk>0?Math.round(val/stk*100)/100:0}},[almMov]);
  const addAlmMov=(tp,gal,cuPen,ref,vjRef,uniId,nota)=>{const id=nxId(almMov);const tot=Math.round(gal*cuPen*100)/100;setAlmMov(p=>[...p,{id,fecha:TODAY,tp,gal,cuPen,tot,ref,vjRef,uni:uniId||null,nota}])};
  const liq=useMemo(()=>{const m={};viajes.forEach(v=>{m[v.id]=calcL(v,rutas)});return m},[viajes,rutas]);
  const regC=useMemo(()=>{const r=[];viajes.forEach(v=>v.gastos.forEach(g=>{r.push({f:v.fS||v.fP||"",vj:v.cod,tdoc:g.tdoc,ndoc:g.ndoc,prov:g.prov,base:g.base,igv:g.igv,tot:g.tot,cat:g.cat})}));return r.sort((a,b)=>a.f.localeCompare(b.f))},[viajes]);
  const regV=useMemo(()=>{const r=[];viajes.forEach(v=>v.ingresos.forEach(i=>{const c=gCl(i.cli,clis);r.push({f:i.fecha||"",vj:v.cod,tdoc:i.tdoc,sn:`${i.serie}-${i.nro}`,cli:c?.rs,ruc:c?.ruc,base:i.base,igv:i.igv,tot:i.tot,est:i.estado})}));return r.sort((a,b)=>(a.f||"z").localeCompare(b.f||"z"))},[viajes,clis]);
  const pnd=useMemo(()=>{const pF=[],pC=[];viajes.forEach(v=>v.ingresos.forEach((i,ix)=>{if(i.estado==="PEND_FACTURAR")pF.push({vj:v.cod,vjId:v.id,iIdx:ix,cli:gCl(i.cli,clis)?.rs,tot:i.tot});if(i.estado==="PENDIENTE")pC.push({vj:v.cod,vjId:v.id,iIdx:ix,cli:gCl(i.cli,clis)?.rs,tot:i.tot,sn:`${i.serie}-${i.nro}`,f:i.fecha})}));return{pF,pC}},[viajes,clis]);
  const st=useMemo(()=>{const f=viajes.filter(v=>v.est==="FINALIZADO"),tI=f.reduce((s,v)=>s+liq[v.id].tI,0),tC=f.reduce((s,v)=>s+liq[v.id].tG,0);return{tI,tC,mg:tI>0?((tI-tC)/tI*100):0,eR:viajes.filter(v=>v.est==="EN_RUTA").length,pr:viajes.filter(v=>v.est==="PROGRAMADO").length,fn:f.length,nPF:pnd.pF.length,tPC:pnd.pC.reduce((s,p)=>s+p.tot,0),tPF:pnd.pF.reduce((s,p)=>s+p.tot,0)}},[viajes,liq,pnd]);
  const delV=useCallback(id=>{setViajes(p=>p.filter(v=>v.id!==id));setCfm(null);setSel(null)},[]);
  const delCo=useCallback(id=>{setCompras(p=>p.filter(c=>c.id!==id));setCfm(null)},[]);
  const delDo=useCallback(id=>{setDocs(p=>p.filter(d=>d.id!==id));setCfm(null)},[]);
  const mvV=useCallback((id,ns)=>setViajes(p=>p.map(v=>v.id===id?{...v,est:ns,fS:ns==="EN_RUTA"&&!v.fS?TODAY:v.fS,fL:ns==="FINALIZADO"?TODAY:v.fL}:v)),[]);
  const openNewVj=()=>{setVjModal({mode:"new"});setVjTab("general")};
  const openEditVj=(v)=>{setVjModal({mode:"edit",vj:v});setVjTab("general")};
  const saveVj=useCallback((data)=>{
    if(vjModal?.mode==="edit"){setViajes(p=>p.map(v=>v.id===data.id?data:v))}
    else{setViajes(p=>[...p,data])}
    setVjModal(null);
  },[vjModal]);
  const B=({t,bg,c:cl})=><span style={{display:"inline-flex",padding:"2px 6px",borderRadius:4,fontSize:9,fontWeight:600,background:bg,color:cl,whiteSpace:"nowrap"}}>{t}</span>;
  const dC=t=>t==="FACTURA"?["#064E3B","#6EE7B7"]:t==="FACT_EXT"?["#1E3A5F","#93C5FD"]:t==="DOC_INT"||t==="DOC_INTERNO"?["#3B0764","#C4B5FD"]:t==="BOLETA"?["#78350F","#FDE68A"]:["#1F2937","#9CA3AF"];
  const IB=({i,onClick,c,t})=><button title={t} onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,padding:"1px 3px",opacity:.5,color:c||"inherit"}} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=.5}>{i}</button>;
  const NAV=[{k:"dashboard",l:"Dashboard",i:"📊"},{k:"viajes",l:"Viajes",i:"🚛"},{k:"combustible",l:"Combustible",i:"⛽"},{k:"liquidacion",l:"Liquidación",i:"💰"},{k:"semaforo",l:"Semáforo Docs",i:"🚦"},{k:"documentos",l:"Documentos",i:"📎"},{k:"regcompras",l:"Reg.Compras",i:"📕"},{k:"regventas",l:"Reg.Ventas",i:"📗"},{k:"cajabancos",l:"Caja/Bancos",i:"🏦"},{k:"cuentas",l:"Ctas x Cobrar",i:"💳"}];
  return(<div style={{fontFamily:"'IBM Plex Sans',sans-serif",background:"#07080C",color:"#B8C4D4",minHeight:"100vh"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      @keyframes su{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      *{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#252D3A;border-radius:2px}
      .cd{background:#0E1219;border:1px solid #181E2A;border-radius:8px}
      .bt{padding:5px 10px;border-radius:5px;border:1px solid #181E2A;background:#0E1219;color:#6B7A8D;cursor:pointer;font-family:inherit;font-size:10px;font-weight:500;transition:all .1s}.bt:hover{background:#181E2A;color:#E0E7F0}
      .ba{background:#1E3A5F;border-color:#1E3A5F;color:#93C5FD}.ba:hover{background:#1E3050}
      .mn{font-family:'JetBrains Mono',monospace}
      .ni{padding:6px 12px;cursor:pointer;font-size:10px;font-weight:500;color:#3E4A5A;border-left:2px solid transparent;display:flex;align-items:center;gap:6px;transition:all .08s}.ni:hover{color:#B8C4D4;background:#0E1219}.ni.ac{color:#F59E0B;border-left-color:#F59E0B;background:#0E121966}
      .tbl{width:100%;border-collapse:collapse}.tbl th{padding:6px 7px;text-align:left;font-size:8px;font-weight:600;color:#3E4A5A;text-transform:uppercase;background:#07080C;border-bottom:1px solid #181E2A}.tbl td{padding:5px 7px;font-size:10px;border-bottom:1px solid #181E2A15}.tbl tr:hover td{background:#181E2A22}
      .ov{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:50;display:flex;align-items:center;justify-content:center}.mo{background:#0E1219;border:1px solid #181E2A;border-radius:12px;width:96%;max-width:800px;max-height:90vh;overflow-y:auto;animation:su .15s}
      .bar{height:4px;border-radius:2px;background:#181E2A;overflow:hidden}.bf{height:100%;border-radius:2px}
      .kc{background:#07080C;border:1px solid #181E2A;border-radius:7px;padding:9px;cursor:pointer;transition:border .1s}.kc:hover{border-color:#252D3A}
      .tb{padding:5px 10px;cursor:pointer;font-size:10px;font-weight:600;color:#3E4A5A;border-bottom:2px solid transparent}.tb:hover{color:#B8C4D4}.tb.ac{color:#F59E0B;border-bottom-color:#F59E0B}
      .bx{background:#07080C;border-radius:5px;padding:7px 9px}
    `}</style>
    <div style={{display:"grid",gridTemplateColumns:"170px 1fr",minHeight:"100vh"}}>
      <aside style={{background:"#0A0C12",borderRight:"1px solid #181E2A",padding:"10px 0",position:"sticky",top:0,height:"100vh",overflow:"auto"}}>
        <div style={{padding:"8px 12px 12px",borderBottom:"1px solid #181E2A",marginBottom:4,textAlign:"center"}}>
          <img src={LOGO} alt="NTF" style={{height:36,marginBottom:4,objectFit:"contain"}}/>
          <div style={{fontSize:7,color:"#3E4A5A"}}>Sistema Integral v3</div>
        </div>
        {NAV.map(n=><div key={n.k} className={`ni ${view===n.k?"ac":""}`} onClick={()=>setView(n.k)}><span style={{fontSize:12}}>{n.i}</span><span>{n.l}</span></div>)}
        <div style={{padding:"8px 12px",borderTop:"1px solid #181E2A",marginTop:6}}>
          <div className="mn" style={{fontSize:8,color:"#2A3344"}}>{TODAY}</div>
          <div style={{fontSize:7,color:"#3E4A5A",marginTop:2}}>NTF Fernández SCRL</div>
        </div>
      </aside>
      <main style={{padding:"12px 16px",overflow:"auto"}}>
        {view==="dashboard"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><img src={LOGO} alt="NTF" style={{height:28}}/><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>Panel Gerencial</h2></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:7,marginBottom:12}}>
            {[["Ingresos",fS(st.tI),"#34D399"],["Costos s/IGV",fS(st.tC),"#F87171"],["Margen",n2(st.mg)+"%","#F59E0B"],["En Ruta",st.eR,"#F59E0B"],["Pend.Fact",st.nPF,"#A78BFA"],["Pend.Cobro",fS(st.tPC),"#F87171"],["Finalizados",st.fn,"#34D399"],["Programados",st.pr,"#818CF8"]].map(([l,v,c],x)=>
              <div key={x} className="cd" style={{padding:"10px 12px",borderTop:`2px solid ${c}`}}><div style={{fontSize:8,color:"#3E4A5A",fontWeight:600,textTransform:"uppercase"}}>{l}</div><div className="mn" style={{fontSize:19,fontWeight:700,color:c,marginTop:2}}>{v}</div></div>
            )}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div className="cd" style={{padding:10}}><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>💰 Rentabilidad</div>
              {viajes.filter(v=>v.est==="FINALIZADO").sort((a,b)=>liq[b.id].p-liq[a.id].p).map(v=>{const l=liq[v.id],rt=gR(v.ruta,rutas);return(
                <div key={v.id} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 0",borderBottom:"1px solid #181E2A11",cursor:"pointer"}} onClick={()=>{setSel(v);setTab("resumen")}}>
                  <span className="mn" style={{fontSize:9,fontWeight:600,color:"#F59E0B",minWidth:85}}>{v.cod}</span>
                  <span style={{fontSize:9,color:"#3E4A5A",flex:1}}>{rt?.o}→{rt?.d}</span>
                  <span className="mn" style={{fontSize:9,fontWeight:600,color:l.p>=20?"#34D399":"#F87171"}}>{n2(l.p)}%</span>
                  <span className="mn" style={{fontSize:8,color:"#3E4A5A"}}>{fS(l.m)}</span>
                </div>)})}
            </div>
            <div className="cd" style={{padding:10}}><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>💳 Estado de Cuenta</div>
              {pnd.pC.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 0",borderBottom:"1px solid #181E2A11"}}><span className="mn" style={{fontSize:9,fontWeight:600,color:"#818CF8"}}>{p.vj}</span><span style={{fontSize:9,color:"#3E4A5A",flex:1}}>{p.cli}</span><span className="mn" style={{fontSize:9,fontWeight:600,color:"#F87171"}}>{fS(p.tot)}</span></div>)}
              {pnd.pF.length>0&&<><div style={{fontSize:9,fontWeight:600,color:"#A78BFA",marginTop:6,marginBottom:3}}>📝 Pend. Facturar</div>
              {pnd.pF.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 0"}}><span className="mn" style={{fontSize:9,fontWeight:600,color:"#A78BFA"}}>{p.vj}</span><span style={{fontSize:9,color:"#3E4A5A",flex:1}}>{p.cli}</span><span className="mn" style={{fontSize:9,fontWeight:600,color:"#F59E0B"}}>{fS(p.tot)}</span></div>)}</>}
            </div>
          </div>
        </div>}
        {view==="viajes"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>🚛 Viajes</h2><button className="bt ba" onClick={openNewVj}>+ Nuevo Viaje</button></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8,alignItems:"start"}}>
            {KCOLS.filter(col=>viajes.some(v=>v.est===col.k)).map(col=>{const cv=viajes.filter(v=>v.est===col.k);return(<div key={col.k}>
              <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:6}}><span>{col.i}</span><span style={{fontSize:10,fontWeight:700,color:col.c}}>{col.l}</span><span style={{fontSize:9,color:"#2A3344"}}>({cv.length})</span></div>
              {cv.map(v=>{const tr=gU(v.tr,unis),rt=gR(v.ruta,rutas),l=liq[v.id],sm=v.semi?gSm(v.semi,semis):null;return(
                <div key={v.id} className="kc" style={{borderLeft:`3px solid ${col.c}`,marginBottom:6}} onClick={()=>{setSel(v);setTab("resumen")}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                    <span className="mn" style={{fontSize:9,fontWeight:600,color:col.c}}>{v.cod}</span>
                    <div style={{display:"flex",gap:0}} onClick={e=>e.stopPropagation()}>
                      <IB i="✏️" t="Editar" onClick={()=>openEditVj(v)}/>
                      <IB i="🗑️" c="#F87171" t="Eliminar" onClick={()=>setCfm({t:"viaje",id:v.id,l:v.cod})}/>
                    </div>
                  </div>
                  <B t={v.serv} bg={v.serv==="INTL"?"#312E81":"#181E2A"} c={v.serv==="INTL"?"#A5B4FC":"#6B7A8D"}/>
                  {rt&&<div style={{fontSize:10,fontWeight:600,color:"#E0E7F0",marginTop:2}}>{rt.o} → {rt.d}</div>}
                  <div style={{fontSize:9,color:"#3E4A5A"}}>🚛 {tr?.pl} · 👤 {gC(v.con,conds)?.nm}{sm?` · 🔗${sm.pl}`:""}</div>
                  {v.contenedor&&<div style={{fontSize:8,color:"#93C5FD"}}>📦 {v.contenedor}</div>}
                  {v.gastos.length>0&&<div style={{marginTop:3,padding:"3px 5px",background:"#181E2A33",borderRadius:3,display:"flex",justifyContent:"space-between",fontSize:8}}>
                    <span>Costo: <span className="mn" style={{color:"#F87171"}}>{fS(l.tG)}</span></span>
                    <span>Mg: <span className="mn" style={{color:l.p>=20?"#34D399":"#F87171"}}>{n2(l.p)}%</span></span>
                  </div>}
                  {(v.bolsa.pen>0||v.bolsa.usd>0)&&<div style={{fontSize:8,color:"#F59E0B",marginTop:2}}>💰 {v.bolsa.pen>0?fS(v.bolsa.pen):""}{v.bolsa.pen>0&&v.bolsa.usd>0?" + ":""}{v.bolsa.usd>0?"$"+fN(v.bolsa.usd):""}</div>}
                  {v.estDetalle&&v.estDetalle.motivo&&<div style={{marginTop:3,padding:"3px 5px",background:`${col.c}11`,border:`1px solid ${col.c}22`,borderRadius:3,fontSize:8}}><div style={{color:col.c,fontWeight:600}}>{v.estDetalle.motivo}</div>{v.estDetalle.ubicacion&&<div style={{color:"#3E4A5A"}}>📍 {v.estDetalle.ubicacion}</div>}</div>}
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                    <span className="mn" style={{fontSize:8,color:"#2A3344"}}>{fD(v.fP)}</span>
                    <div style={{display:"flex",gap:2}} onClick={e=>e.stopPropagation()}>
                      {col.k==="PROGRAMADO"&&<button className="bt" style={{fontSize:8,padding:"2px 6px"}} onClick={()=>mvV(v.id,"EN_RUTA")}>▶ Iniciar</button>}
                      {col.k==="EN_RUTA"&&<><button className="bt" style={{fontSize:8,padding:"2px 6px"}} onClick={()=>mvV(v.id,"FINALIZADO")}>✓ Fin</button><button className="bt" style={{fontSize:8,padding:"2px 6px"}} onClick={()=>mvV(v.id,"ESPERA_CARGA")}>⏳</button></>}
                      {(col.k==="ESPERA_CARGA"||col.k==="MANTENIMIENTO"||col.k==="SIN_MOVIMIENTO")&&<button className="bt" style={{fontSize:8,padding:"2px 6px"}} onClick={()=>mvV(v.id,"EN_RUTA")}>▶ Reanudar</button>}
                    </div>
                  </div>
                </div>
              )})}
            </div>)})}
          </div>
        </div>}
        {view==="combustible"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>⛽ Combustible</h2>
            <div style={{display:"flex",gap:4}}>
              {combTab==="compras"&&<button className="bt ba" onClick={()=>setCombModal({mode:"new"})}>+ Compra Ecuador</button>}
              {combTab==="almacen"&&<><button className="bt ba" onClick={()=>setAlmModal({tp:"ENTRADA"})}>+ Entrada</button><button className="bt" style={{borderColor:"#F87171",color:"#F87171"}} onClick={()=>setAlmModal({tp:"SALIDA"})}>- Despacho</button></>}
            </div>
          </div>
          <div style={{display:"flex",gap:0,borderBottom:"1px solid #181E2A",marginBottom:8}}>
            {[["compras","📦 Compras Ecuador"],["almacen","🏭 Almacén Interno"]].map(([k,la])=><div key={k} className={`tb ${combTab===k?"ac":""}`} onClick={()=>setCombTab(k)}>{la}</div>)}
          </div>
          {combTab==="compras"&&<>
            <div style={{fontSize:9,color:"#F59E0B",marginBottom:6}}>Facturación extranjera — Pagadas con bolsa de viaje</div>
            <div className="cd" style={{overflow:"auto"}}>
            <table className="tbl"><thead><tr><th>Lote</th><th>Fecha</th><th>Proveedor</th><th>Doc</th><th>Gal</th><th>P.U.$</th><th>TC</th><th>Total S/</th><th>C.U.</th><th>Viaje</th><th></th></tr></thead><tbody>
              {compras.map((c,ci)=>{const vj=viajes.find(v=>v.id===c.vjId);return(<tr key={c.id}>
                <td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{c.lote}</td><td className="mn" style={{color:"#6B7A8D"}}>{fD(c.fecha)}</td>
                <td style={{fontSize:9}}>{c.prov}</td><td><B t={c.tdoc} bg={dC(c.tdoc)[0]} c={dC(c.tdoc)[1]}/></td>
                <td className="mn" style={{fontWeight:600}}>{fN(c.gal)}</td><td className="mn">${n2(c.puUsd)}</td><td className="mn">{c.tc}</td>
                <td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(c.tot)}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{fS(c.cu)}</td>
                <td className="mn" style={{fontWeight:600,color:"#818CF8"}}>{vj?.cod||"—"}</td>
                <td style={{whiteSpace:"nowrap"}}><IB i="✏️" t="Editar" onClick={()=>setCombModal({mode:"edit",data:c,idx:ci})}/><IB i="🗑️" c="#F87171" t="Eliminar" onClick={()=>setCfm({t:"compra",id:c.id,l:c.lote})}/></td>
              </tr>)})}
            </tbody></table></div>
          </>}
          {combTab==="almacen"&&<>
            <div style={{fontSize:9,color:"#6B7A8D",marginBottom:8}}>Combustible descargado de viajes INTL para uso en rutas locales — Costo promedio ponderado</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:10}}>
              <div className="cd" style={{padding:10,textAlign:"center",borderTop:"3px solid #F59E0B"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Stock Galones</div><div className="mn" style={{fontSize:20,fontWeight:700,color:"#F59E0B"}}>{fN(almStock.stk)}</div></div>
              <div className="cd" style={{padding:10,textAlign:"center",borderTop:"3px solid #34D399"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Valor Almacén</div><div className="mn" style={{fontSize:20,fontWeight:700,color:"#34D399"}}>{fS(almStock.val)}</div></div>
              <div className="cd" style={{padding:10,textAlign:"center",borderTop:"3px solid #93C5FD"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Costo Prom. S//Gal</div><div className="mn" style={{fontSize:20,fontWeight:700,color:"#93C5FD"}}>{fS(almStock.cu)}</div></div>
              <div className="cd" style={{padding:10,textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Movimientos</div><div className="mn" style={{fontSize:20,fontWeight:700,color:"#6B7A8D"}}>{almMov.length}</div></div>
            </div>
            <div style={{fontSize:11,fontWeight:600,color:"#F1F5F9",marginBottom:6}}>📋 Kardex de Almacén</div>
            <div className="cd" style={{overflow:"auto"}}>
            <table className="tbl"><thead><tr><th>Fecha</th><th>Tipo</th><th>Ref.</th><th>Viaje/Lote</th><th>Unidad</th><th>Galones</th><th>C.U. S/</th><th>Total S/</th><th>Nota</th></tr></thead><tbody>
              {[...almMov].sort((a,b)=>b.id-a.id).map(m=>{const u=m.uni?gU(m.uni,unis):null;return(<tr key={m.id}>
                <td className="mn" style={{color:"#6B7A8D"}}>{fD(m.fecha)}</td>
                <td><B t={m.tp} bg={m.tp==="ENTRADA"?"#064E3B":"#7F1D1D44"} c={m.tp==="ENTRADA"?"#6EE7B7":"#FCA5A5"}/></td>
                <td className="mn" style={{fontSize:8,fontWeight:600}}>{m.ref}</td>
                <td className="mn" style={{fontSize:8,color:"#818CF8"}}>{m.vjRef||"—"}</td>
                <td className="mn" style={{fontSize:8,color:"#F59E0B"}}>{u?u.pl:"—"}</td>
                <td className="mn" style={{fontWeight:600,color:m.tp==="ENTRADA"?"#34D399":"#F87171"}}>{m.tp==="ENTRADA"?"+":"-"}{fN(m.gal)}</td>
                <td className="mn">{fS(m.cuPen)}</td>
                <td className="mn" style={{fontWeight:600,color:"#F1F5F9"}}>{fS(m.tot)}</td>
                <td style={{fontSize:8,color:"#6B7A8D",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis"}}>{m.nota}</td>
              </tr>)})}
            </tbody></table></div>
            <div style={{marginTop:6,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              <div className="cd" style={{padding:8,textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Total Entradas</div><div className="mn" style={{fontSize:13,fontWeight:700,color:"#34D399"}}>{fN(almMov.filter(m=>m.tp==="ENTRADA").reduce((s,m)=>s+m.gal,0))} gal</div></div>
              <div className="cd" style={{padding:8,textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Total Salidas</div><div className="mn" style={{fontSize:13,fontWeight:700,color:"#F87171"}}>{fN(almMov.filter(m=>m.tp==="SALIDA").reduce((s,m)=>s+m.gal,0))} gal</div></div>
            </div>
          </>}
        </div>}
        {view==="liquidacion"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>💰 Liquidación por Viaje</h2>
            <button className="bt ba" onClick={()=>setQuickAdd({type:"caja",fields:{nm:"",tipo:"CAJA"}})}>+ Caja/Banco</button></div>
          <div style={{fontSize:9,color:"#6B7A8D",marginBottom:8}}>Bolsa dual PEN/USD · Gastos por moneda · Cierre con saldo</div>
          <div className="cd" style={{overflow:"auto",marginBottom:8}}>
            <table className="tbl"><thead><tr><th>Viaje</th><th>Ruta</th><th>Bolsa S/</th><th>Or.PEN</th><th>Bolsa $</th><th>Or.USD</th><th>Gast.S/</th><th>Gast.$</th><th>Saldo S/</th><th>Saldo $</th><th>Liq.</th><th></th></tr></thead><tbody>
              {viajes.map(v=>{const l=liq[v.id],rt=gR(v.ruta,rutas),eLiq=v.bolsa.estLiq||"PENDIENTE",
                gPen=v.gastos.filter(g=>g.mon==="PEN").reduce((s,g)=>s+g.tot,0),gUsd=v.gastos.filter(g=>g.mon!=="PEN").reduce((s,g)=>s+g.monto,0),
                sPen=v.bolsa.pen-gPen,sUsd=v.bolsa.usd-gUsd,
                orPenC=v.bolsa.orPen?cajas.find(c=>c.id===v.bolsa.orPen):null,orUsdC=v.bolsa.orUsd?cajas.find(c=>c.id===v.bolsa.orUsd):null;
                return(<tr key={v.id} style={{cursor:"pointer",opacity:eLiq==="LIQUIDADO"?.65:1}} onClick={()=>setLiqSel(liqSel===v.id?null:v.id)}>
                <td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{v.cod}</td>
                <td style={{fontSize:9}}>{rt?.o}→{rt?.d}</td>
                <td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(v.bolsa.pen)}</td>
                <td style={{fontSize:8}}>{orPenC?<B t={orPenC.nm} bg="#064E3B" c="#6EE7B7"/>:<span style={{color:"#3E4A5A"}}>—</span>}</td>
                <td className="mn" style={{fontWeight:600,color:"#93C5FD"}}>${fN(v.bolsa.usd)}</td>
                <td style={{fontSize:8}}>{orUsdC?<B t={orUsdC.nm} bg="#1E3A5F" c="#93C5FD"/>:<span style={{color:"#3E4A5A"}}>—</span>}</td>
                <td className="mn" style={{color:"#F87171"}}>{fS(gPen)}</td>
                <td className="mn" style={{color:"#F87171"}}>${fN(gUsd)}</td>
                <td className="mn" style={{fontWeight:600,color:sPen>=0?"#34D399":"#F87171"}}>{fS(sPen)}</td>
                <td className="mn" style={{fontWeight:600,color:sUsd>=0?"#93C5FD":"#F87171"}}>${fN(sUsd)}</td>
                <td><B t={eLiq==="LIQUIDADO"?"LIQUIDADO":eLiq==="EN_PROCESO"?"EN PROCESO":"PENDIENTE"} bg={eLiq==="LIQUIDADO"?"#064E3B":eLiq==="EN_PROCESO"?"#78350F":"#7F1D1D44"} c={eLiq==="LIQUIDADO"?"#6EE7B7":eLiq==="EN_PROCESO"?"#FDE68A":"#FCA5A5"}/></td>
                <td onClick={e=>e.stopPropagation()} style={{whiteSpace:"nowrap"}}>
                  {eLiq!=="LIQUIDADO"&&<><button className="bt" style={{fontSize:8,padding:"2px 5px"}} onClick={()=>setBolsaModal({vjId:v.id})}>💰 Bolsa</button>
                  <button className="bt" style={{fontSize:8,padding:"2px 5px",marginLeft:2}} onClick={()=>setGastoModal({vjId:v.id})}>+ Gasto</button>
                  {v.gastos.length>0&&<button className="bt ba" style={{fontSize:8,padding:"2px 5px",marginLeft:2}} onClick={()=>setSaldoModal({vjId:v.id,sPen,sUsd})}>🔒</button>}</>}
                </td>
              </tr>)})}
            </tbody></table></div>
          {liqSel&&(()=>{const v=viajes.find(x=>x.id===liqSel);if(!v)return null;const l=liq[v.id],
            gPen=v.gastos.filter(g=>g.mon==="PEN").reduce((s,g)=>s+g.tot,0),gUsd=v.gastos.filter(g=>g.mon!=="PEN").reduce((s,g)=>s+g.monto,0),
            sPen=v.bolsa.pen-gPen,sUsd=v.bolsa.usd-gUsd,
            orPenC=v.bolsa.orPen?cajas.find(c=>c.id===v.bolsa.orPen):null,orUsdC=v.bolsa.orUsd?cajas.find(c=>c.id===v.bolsa.orUsd):null;return(
            <div className="cd" style={{padding:12,marginBottom:8,animation:"su .15s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><span className="mn" style={{fontSize:13,fontWeight:700,color:"#F59E0B"}}>{v.cod}</span><span style={{fontSize:10,color:"#6B7A8D"}}>{gR(v.ruta,rutas)?.o} → {gR(v.ruta,rutas)?.d}</span>
                <B t={v.bolsa.estLiq||"PENDIENTE"} bg={v.bolsa.estLiq==="LIQUIDADO"?"#064E3B":"#78350F"} c={v.bolsa.estLiq==="LIQUIDADO"?"#6EE7B7":"#FDE68A"}/></div>
                <button className="bt" onClick={()=>setLiqSel(null)}>✕</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:6}}>
                <div className="bx" style={{textAlign:"center",borderTop:"2px solid #34D399"}}><div style={{fontSize:7,color:"#3E4A5A"}}>BOLSA S/</div><div className="mn" style={{fontSize:13,fontWeight:700,color:"#34D399"}}>{fS(v.bolsa.pen)}</div><div style={{fontSize:7,color:"#3E4A5A"}}>{orPenC?.nm||"—"}</div></div>
                <div className="bx" style={{textAlign:"center",borderTop:"2px solid #93C5FD"}}><div style={{fontSize:7,color:"#3E4A5A"}}>BOLSA $</div><div className="mn" style={{fontSize:13,fontWeight:700,color:"#93C5FD"}}>${fN(v.bolsa.usd)}</div><div style={{fontSize:7,color:"#3E4A5A"}}>{orUsdC?.nm||"—"}</div></div>
                <div className="bx" style={{textAlign:"center",borderTop:`2px solid ${sPen>=0?"#34D399":"#F87171"}`}}><div style={{fontSize:7,color:"#3E4A5A"}}>SALDO S/</div><div className="mn" style={{fontSize:13,fontWeight:700,color:sPen>=0?"#34D399":"#F87171"}}>{fS(sPen)}</div></div>
                <div className="bx" style={{textAlign:"center",borderTop:`2px solid ${sUsd>=0?"#93C5FD":"#F87171"}`}}><div style={{fontSize:7,color:"#3E4A5A"}}>SALDO $</div><div className="mn" style={{fontSize:13,fontWeight:700,color:sUsd>=0?"#93C5FD":"#F87171"}}>${fN(sUsd)}</div></div>
              </div>
              {v.bolsa.saldoAccion&&<div style={{padding:"4px 8px",background:"#064E3B22",borderRadius:4,marginBottom:8,fontSize:9,color:"#6EE7B7"}}>✅ PEN: {v.bolsa.saldoAccion} → {cajas.find(c=>c.id===v.bolsa.saldoDestPen)?.nm||"—"} | USD: {v.bolsa.saldoAccionUsd||"—"} → {cajas.find(c=>c.id===v.bolsa.saldoDestUsd)?.nm||"—"}</div>}
              <div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:4}}>📕 Gastos ({v.gastos.length}){v.bolsa.estLiq!=="LIQUIDADO"&&<button className="bt ba" style={{fontSize:8,marginLeft:8}} onClick={()=>setGastoModal({vjId:v.id})}>+ Agregar Gasto</button>}</div>
              {v.gastos.length>0?<table className="tbl"><thead><tr><th>Cat.</th><th>Doc</th><th>Nro</th><th>Proveedor</th><th>ID</th><th>Mon</th><th>Monto</th><th>TC</th><th>Base</th><th>IGV</th><th>Total</th><th></th></tr></thead><tbody>
                {v.gastos.map((g,i)=><tr key={i}><td style={{fontWeight:600,fontSize:9}}>{g.cat}</td><td><B t={g.tdoc} bg={dC(g.tdoc)[0]} c={dC(g.tdoc)[1]}/></td><td className="mn" style={{fontSize:8}}>{g.ndoc}</td><td style={{fontSize:9}}>{g.prov}</td><td style={{fontSize:8,color:"#3E4A5A"}}>{g.provTdoc?`${g.provTdoc}:${g.provNdoc}`:""}</td><td className="mn" style={{fontSize:8}}>{g.mon}</td><td className="mn">{g.mon==="USD"?"$"+fN(g.monto):fS(g.monto)}</td><td className="mn" style={{fontSize:8}}>{g.tc!==1?g.tc:""}</td><td className="mn">{fS(g.base)}</td><td className="mn" style={{color:g.igv>0?"#F59E0B":"#2A3344"}}>{fS(g.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(g.tot)}</td>
                  <td style={{whiteSpace:"nowrap"}}>{v.bolsa.estLiq!=="LIQUIDADO"&&<><IB i="✏️" t="Editar" onClick={()=>setGastoModal({vjId:v.id,gasto:g,idx:i})}/><IB i="🗑️" c="#F87171" t="Eliminar" onClick={()=>delGasto(v.id,i)}/></>}</td></tr>)}
              </tbody></table>:<div style={{fontSize:10,color:"#3E4A5A",padding:8,textAlign:"center"}}>Sin gastos registrados</div>}
              <div style={{marginTop:8,padding:6,background:"#181E2A33",borderRadius:4,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:4,fontSize:8}}>
                {CATS_G.map(cat=>{const t=v.gastos.filter(g=>g.cat===cat).reduce((s,g)=>s+g.tot,0);return t>0?<div key={cat} style={{display:"flex",justifyContent:"space-between",padding:"2px 4px"}}><span style={{color:"#6B7A8D"}}>{cat}</span><span className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{fS(t)}</span></div>:null}).filter(Boolean)}
              </div>
            </div>
          )})()}
          <div style={{marginTop:6,fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:4}}>🏦 Cajas y Bancos</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:6}}>
            {cajas.map(c=><div key={c.id} className="cd" style={{padding:8}}>
              <div style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>{c.tipo==="BANCO"?"🏦":"💰"} {c.nm}</div>
              <div style={{display:"flex",gap:8,marginTop:2}}><div><div style={{fontSize:7,color:"#3E4A5A"}}>PEN</div><div className="mn" style={{fontSize:11,fontWeight:700,color:"#34D399"}}>{fS(c.saldo)}</div></div>
              {(c.saldoUsd||0)>0&&<div><div style={{fontSize:7,color:"#3E4A5A"}}>USD</div><div className="mn" style={{fontSize:11,fontWeight:700,color:"#93C5FD"}}>${fN(c.saldoUsd)}</div></div>}</div>
            </div>)}
          </div>
        </div>}
        {view==="documentos"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>📎 Gestión Documentaria</h2><button className="bt ba" onClick={()=>setDocModal({mode:"new"})}>+ Documento</button></div>
          <div className="cd" style={{overflow:"auto"}}><table className="tbl"><thead><tr><th>Tipo</th><th>Número</th><th>Fecha</th><th>Entidad</th><th>Ref.</th><th>Descripción</th><th>Archivo</th><th></th></tr></thead><tbody>
            {docs.map((d,di)=><tr key={d.id}><td><B t={d.tipo} bg={dC(d.tipo)[0]} c={dC(d.tipo)[1]}/></td><td className="mn" style={{fontWeight:600}}>{d.nro}</td><td className="mn" style={{color:"#6B7A8D"}}>{fD(d.fecha)}</td><td style={{fontSize:9}}>{d.ent}</td><td className="mn" style={{fontSize:9,color:"#F59E0B"}}>{d.ref}</td><td style={{fontSize:9}}>{d.desc}</td>
              <td>{d.arch?<span style={{color:"#34D399",fontSize:9}}>📄 {d.arch}</span>:<span style={{color:"#F87171",fontSize:9}}>⚠ Sin archivo</span>}</td>
              <td style={{whiteSpace:"nowrap"}}><IB i="✏️" t="Editar" onClick={()=>setDocModal({mode:"edit",data:d,idx:di})}/><IB i="🗑️" c="#F87171" t="Eliminar" onClick={()=>setCfm({t:"doc",id:d.id,l:d.nro})}/></td></tr>)}
          </tbody></table></div>
        </div>}
        
{/* ═══ SEMÁFORO DOCS / GESTIÓN DOCUMENTARIA ═══ */}
{view==="semaforo"&&<div style={{animation:"su .2s"}}>
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,marginBottom:10,flexWrap:"wrap"}}>
    <div>
      <h2 style={{fontSize:15,fontWeight:700,color:"#F1F5F9"}}>🚦 Semáforo Documentario — Tractos & Semirremolques</h2>
      <div style={{fontSize:9,color:"#55657A",marginTop:2}}>Control configurable por tipo de documento. Click en una celda para editar vencimiento.</div>
    </div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <button className="bt" onClick={()=>setUnitModal(true)}>⚙️ Unidades</button>
      <button className="bt" onClick={()=>setDocTypeModal(true)}>🧩 Tipos de Docs</button>
    </div>
  </div>

  <div className="cd" style={{overflow:"hidden"}}>
    <div style={{overflowX:"auto"}}>
      {(()=>{
        const slug=s=>(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");
        const keyOf=(kind,id)=>`${kind}:${id}`;
        const fmt=(d)=>d?new Date(d+"T12:00:00").toLocaleDateString("es-PE",{day:"2-digit",month:"2-digit",year:"2-digit"}):"";
        const docSt=(rec,td)=>{
          if(!rec||!rec.venc) return {s:"FALTA",d:"—",c:"#64748B"};
          const hoy=new Date(TODAY+"T12:00:00");
          const venc=new Date(rec.venc+"T12:00:00");
          const dias=Math.ceil((venc-hoy)/(1000*60*60*24));
          if(dias<0) return {s:"VENCIDO",d:String(Math.abs(dias)),c:"#FCA5A5"};
          if(dias<=Number(td.w||30)) return {s:"POR_VENCER",d:String(dias),c:"#FCD34D"};
          return {s:"VIGENTE",d:"✓",c:"#6EE7B7"};
        };
        const worst=(uKey)=>{
          let w="FALTA";
          for(const td of docTypesCtrl){
            const st=docSt((docCtrl[uKey]||{})[td.c],td).s;
            if(st==="VENCIDO") return "VENCIDO";
            if(st==="POR_VENCER") w="POR_VENCER";
            if(st==="VIGENTE" && w==="FALTA") w="VIGENTE";
          }
          return w;
        };
        const Dot=({st})=><span style={{width:6,height:6,borderRadius:999,display:"inline-block",background:st==="VIGENTE"?"#10B981":st==="POR_VENCER"?"#F59E0B":st==="FALTA"?"#64748B":"#EF4444"}}/>;
        const Bdg=({t,bg,c})=><span style={{display:"inline-flex",padding:"2px 7px",borderRadius:999,fontSize:9,fontWeight:700,background:bg,color:c,whiteSpace:"nowrap",border:`1px solid ${c}22`}}>{t}</span>;

        const rows=[
          ...unis.map(u=>({kind:"T",id:u.id,pl:u.pl,mk:u.mk,label:"TRACTO"})),
          ...semis.map(s=>({kind:"S",id:s.id,pl:s.pl,mk:s.tipo,label:"SEMI"})),
        ];

        return (
          <div style={{display:"grid",gridTemplateColumns:`160px 70px 60px repeat(${docTypesCtrl.length},64px)`,minWidth:760}}>
            <div style={{padding:"9px 10px",background:"#08090D",fontSize:9,fontWeight:700,color:"#3A4255",textTransform:"uppercase"}}>Unidad</div>
            <div style={{padding:"9px 6px",background:"#08090D",fontSize:9,fontWeight:700,color:"#3A4255",textTransform:"uppercase",textAlign:"center"}}>Tipo</div>
            <div style={{padding:"9px 6px",background:"#08090D",fontSize:9,fontWeight:700,color:"#3A4255",textTransform:"uppercase",textAlign:"center"}}>Est.</div>
            {docTypesCtrl.map(td=><div key={td.c} style={{padding:"9px 4px",background:"#08090D",fontSize:8,fontWeight:800,color:"#3A4255",textTransform:"uppercase",textAlign:"center",lineHeight:1.15}} title={`Alerta: ${td.w||30} días`}>{td.n}</div>)}

            {rows.map((r,ri)=>{
              const uKey=keyOf(r.kind,r.id);
              const ov=worst(uKey);
              return (
                <div key={uKey} style={{display:"contents"}}>
                  <div style={{padding:"7px 10px",borderBottom:"1px solid #1A1F2E22",display:"flex",alignItems:"center",gap:8,background:ri%2?"#0E1219":"transparent"}}>
                    <Dot st={ov}/>
                    <div style={{minWidth:0}}>
                      <div className="mn" style={{fontWeight:800,fontSize:12,color:"#E2E8F0",letterSpacing:.2}}>{r.pl}</div>
                      <div style={{fontSize:9,color:"#3A4255",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.mk||""}</div>
                    </div>
                  </div>

                  <div style={{padding:"7px 6px",borderBottom:"1px solid #1A1F2E22",display:"flex",justifyContent:"center",alignItems:"center",background:ri%2?"#0E1219":"transparent"}}>
                    <Bdg t={r.label} bg={r.kind==="T"?"#0B1220":"#10131A"} c={r.kind==="T"?"#93C5FD":"#A7F3D0"} />
                  </div>

                  <div style={{padding:"7px 6px",borderBottom:"1px solid #1A1F2E22",display:"flex",justifyContent:"center",alignItems:"center",background:ri%2?"#0E1219":"transparent"}}>
                    <Bdg t={ov==="VIGENTE"?"OK":ov==="POR_VENCER"?"⚠":ov==="FALTA"?"—":"✗"} bg={ov==="VIGENTE"?"#064E3B":ov==="POR_VENCER"?"#78350F":ov==="FALTA"?"#1A1F2E":"#7F1D1D"} c={ov==="VIGENTE"?"#6EE7B7":ov==="POR_VENCER"?"#FCD34D":ov==="FALTA"?"#7A8599":"#FCA5A5"} />
                  </div>

                  {docTypesCtrl.map(td=>{
                    const rec=((docCtrl[uKey]||{})[td.c])||null;
                    const s=docSt(rec,td);
                    const title = rec?.venc ? `${td.n}\nVence: ${fmt(rec.venc)}${rec.nro?`\nNro: ${rec.nro}`:""}${rec.obs?`\nObs: ${rec.obs}`:""}` : `${td.n}: SIN REGISTRO`;
                    return (
                      <div key={td.c} style={{padding:"4px",borderBottom:"1px solid #1A1F2E22",display:"flex",justifyContent:"center",alignItems:"center",background:ri%2?"#0E1219":"transparent"}}>
                        <button
                          onClick={()=>setDocEdit({key:uKey, unitLabel:`${r.pl} (${r.label})`, docType:td})}
                          style={{position:"relative",cursor:"pointer",width:42,height:30,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,background:s.s==="FALTA"?"#1A1F2E33":s.s==="VIGENTE"?"#064E3B33":s.s==="POR_VENCER"?"#78350F33":"#7F1D1D33",color:s.c,border:`1px solid ${s.c}22`}}
                          title={title}
                        >
                          {s.s==="FALTA"?"—":s.s==="VIGENTE"?"✓":s.d}{rec?.file?.name?<span style={{position:"absolute",top:2,right:4,fontSize:9,opacity:.9}}>📎</span>:null}
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  </div>
</div>}

          {view==="regcompras"&&<div style={{animation:"su .2s"}}>
          <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>📕 Registro de Compras</h2>
          <div className="cd" style={{overflow:"auto"}}><table className="tbl"><thead><tr><th>Fecha</th><th>Viaje</th><th>Tipo</th><th>Nro</th><th>Proveedor</th><th>Cat.</th><th>Base Imp.</th><th>IGV</th><th>Total</th></tr></thead><tbody>
            {regC.map((r,i)=><tr key={i}><td className="mn" style={{color:"#6B7A8D"}}>{fD(r.f)}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{r.vj}</td><td><B t={r.tdoc} bg={dC(r.tdoc)[0]} c={dC(r.tdoc)[1]}/></td><td className="mn" style={{fontSize:8}}>{r.ndoc}</td><td style={{fontSize:9}}>{r.prov}</td><td style={{fontSize:9}}>{r.cat}</td><td className="mn">{fS(r.base)}</td><td className="mn" style={{color:r.igv>0?"#F59E0B":"#2A3344"}}>{fS(r.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(r.tot)}</td></tr>)}
          </tbody></table></div>
          <div style={{marginTop:6,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["Base Imp.",regC.reduce((s,r)=>s+r.base,0),"#F59E0B"],["IGV Créd.Fiscal",regC.reduce((s,r)=>s+r.igv,0),"#818CF8"],["Total",regC.reduce((s,r)=>s+r.tot,0),"#34D399"]].map(([l,v,c])=><div key={l} className="cd" style={{padding:8,textAlign:"center"}}><div style={{fontSize:8,color:"#3E4A5A",textTransform:"uppercase"}}>{l}</div><div className="mn" style={{fontSize:15,fontWeight:700,color:c}}>{fS(v)}</div></div>)}
          </div>
        </div>}
        {view==="regventas"&&<div style={{animation:"su .2s"}}>
          <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>📗 Registro de Ventas</h2>
          <div className="cd" style={{overflow:"auto"}}><table className="tbl"><thead><tr><th>Fecha</th><th>Viaje</th><th>Tipo</th><th>Serie-Nro</th><th>Cliente</th><th>RUC</th><th>Base Imp.</th><th>IGV</th><th>Total</th><th>Estado</th></tr></thead><tbody>
            {regV.map((r,i)=><tr key={i}><td className="mn" style={{color:"#6B7A8D"}}>{fD(r.f)}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{r.vj}</td><td><B t={r.tdoc} bg={dC(r.tdoc)[0]} c={dC(r.tdoc)[1]}/></td><td className="mn" style={{fontWeight:600}}>{r.sn}</td><td style={{fontSize:9}}>{r.cli}</td><td className="mn" style={{fontSize:8}}>{r.ruc}</td><td className="mn">{fS(r.base)}</td><td className="mn" style={{color:r.igv>0?"#F59E0B":"#2A3344"}}>{fS(r.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(r.tot)}</td>
              <td><B t={r.est==="COBRADO"?"COBRADO":r.est==="PENDIENTE"?"PEND.COBRO":"PEND.FACT"} bg={r.est==="COBRADO"?"#064E3B":r.est==="PENDIENTE"?"#7F1D1D44":"#3B076444"} c={r.est==="COBRADO"?"#6EE7B7":r.est==="PENDIENTE"?"#FCA5A5":"#C4B5FD"}/></td></tr>)}
          </tbody></table></div>
        </div>}
        {view==="cajabancos"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>🏦 Caja y Bancos</h2><button className="bt ba" onClick={()=>setQuickAdd({type:"caja",fields:{nm:"",tipo:"CAJA"}})}>+ Nueva Caja/Banco</button></div>
          <div style={{fontSize:9,color:"#6B7A8D",marginBottom:10}}>Control de ingresos, egresos y saldos</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:8,marginBottom:10}}>
            {cajas.map(c=><div key={c.id} className="cd" style={{padding:10,cursor:"pointer",border:cajaDetId===c.id?"1px solid #F59E0B":"1px solid transparent"}} onClick={()=>setCajaDetId(cajaDetId===c.id?null:c.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:10,fontWeight:600,color:"#F1F5F9"}}>{c.tipo==="BANCO"?"🏦":"💰"} {c.nm}</span><B t={c.tipo} bg={c.tipo==="BANCO"?"#1E3A5F":"#78350F"} c={c.tipo==="BANCO"?"#93C5FD":"#FDE68A"}/></div>
              <div style={{display:"flex",gap:12}}><div><div style={{fontSize:7,color:"#3E4A5A"}}>PEN</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#34D399"}}>{fS(c.saldo)}</div></div><div><div style={{fontSize:7,color:"#3E4A5A"}}>USD</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#93C5FD"}}>${fN(c.saldoUsd||0)}</div></div></div>
              <div style={{marginTop:4,fontSize:8,color:"#3E4A5A"}}>Movs: {movs.filter(m=>m.cId===c.id).length}</div>
            </div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>{[["Total PEN",fS(cajas.reduce((s,c)=>s+c.saldo,0)),"#34D399"],["Total USD","$"+fN(cajas.reduce((s,c)=>s+(c.saldoUsd||0),0)),"#93C5FD"]].map(([l,v2,c2])=><div key={l} className="cd" style={{padding:8,textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>{l}</div><div className="mn" style={{fontSize:14,fontWeight:700,color:c2}}>{v2}</div></div>)}</div>
          {cajaDetId&&(()=>{const cj=cajas.find(c=>c.id===cajaDetId);if(!cj)return null;const cms=movs.filter(m=>m.cId===cajaDetId).sort((a,b)=>b.id-a.id);return(
            <div className="cd" style={{padding:12,animation:"su .15s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:13,fontWeight:700,color:"#F1F5F9"}}>{cj.nm}</span>
                <div style={{display:"flex",gap:4}}>
                  <button className="bt ba" style={{fontSize:8}} onClick={()=>setMovModal({cId:cajaDetId,tp:"INGRESO",mon:"PEN",mt:0,con:"",ref:""})}>+ Ingreso</button>
                  <button className="bt" style={{fontSize:8,borderColor:"#F87171",color:"#F87171"}} onClick={()=>setMovModal({cId:cajaDetId,tp:"SALIDA",mon:"PEN",mt:0,con:"",ref:""})}>- Egreso</button>
                  <button className="bt" onClick={()=>setCajaDetId(null)}>X</button>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
                <div className="bx" style={{textAlign:"center",borderTop:"2px solid #34D399"}}><div style={{fontSize:7,color:"#3E4A5A"}}>PEN</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#34D399"}}>{fS(cj.saldo)}</div></div>
                <div className="bx" style={{textAlign:"center",borderTop:"2px solid #93C5FD"}}><div style={{fontSize:7,color:"#3E4A5A"}}>USD</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#93C5FD"}}>${fN(cj.saldoUsd||0)}</div></div>
              </div>
              {cms.length>0?<table className="tbl"><thead><tr><th>Fecha</th><th>Tipo</th><th>Concepto</th><th>Ref.</th><th>Mon</th><th>Monto</th></tr></thead><tbody>
                {cms.map(m=><tr key={m.id}><td className="mn" style={{color:"#6B7A8D"}}>{fD(m.fecha)}</td><td><B t={m.tp} bg={m.tp==="INGRESO"?"#064E3B":"#7F1D1D44"} c={m.tp==="INGRESO"?"#6EE7B7":"#FCA5A5"}/></td><td style={{fontSize:9}}>{m.con}</td><td className="mn" style={{fontSize:8,color:"#F59E0B"}}>{m.ref}</td><td className="mn" style={{fontSize:8}}>{m.mon}</td><td className="mn" style={{fontWeight:600,color:m.tp==="INGRESO"?"#34D399":"#F87171"}}>{m.tp==="INGRESO"?"+":"-"}{m.mon==="USD"?"$"+fN(m.mt):fS(m.mt)}</td></tr>)}
              </tbody></table>:<div style={{fontSize:10,color:"#3E4A5A",padding:8,textAlign:"center"}}>Sin movimientos</div>}
            </div>
          )})()}
        </div>}
        {view==="cuentas"&&<div style={{animation:"su .2s"}}>
          <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>💳 Estado de Cuenta</h2>
          {pnd.pF.length>0&&<><div style={{fontSize:11,fontWeight:600,color:"#A78BFA",marginBottom:6}}>📝 Pendientes de Facturar</div>
          <div className="cd" style={{overflow:"auto",marginBottom:12}}><table className="tbl"><thead><tr><th>Viaje</th><th>Cliente</th><th>Monto</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
            {pnd.pF.map((p,i)=><tr key={i}><td className="mn" style={{fontWeight:600,color:"#A78BFA"}}>{p.vj}</td><td>{p.cli}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{fS(p.tot)}</td><td><B t="PEND.FACT" bg="#3B076444" c="#C4B5FD"/></td><td><button className="bt ba" style={{fontSize:8}} onClick={()=>emitFact(p.vjId,p.iIdx)}>Emitir Factura</button></td></tr>)}
          </tbody></table></div></>}
          {pnd.pC.length>0&&<><div style={{fontSize:11,fontWeight:600,color:"#F87171",marginBottom:6}}>💳 Pendientes de Cobro</div>
          <div className="cd" style={{overflow:"auto",marginBottom:12}}><table className="tbl"><thead><tr><th>Viaje</th><th>Doc.</th><th>Cliente</th><th>Fecha</th><th>Monto</th><th>Acción</th></tr></thead><tbody>
            {pnd.pC.map((p,i)=><tr key={i}><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{p.vj}</td><td className="mn">{p.sn}</td><td>{p.cli}</td><td className="mn">{fD(p.f)}</td><td className="mn" style={{fontWeight:600,color:"#F87171"}}>{fS(p.tot)}</td><td><button className="bt" style={{fontSize:8}} onClick={()=>regCobro(p.vjId,p.iIdx)}>Registrar Cobro</button></td></tr>)}
          </tbody></table></div></>}
          <div className="cd" style={{padding:10}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["Pend.Facturar",st.tPF,"#A78BFA"],["Pend.Cobro",st.tPC,"#F87171"],["Total Recaudar",st.tPC+st.tPF,"#F59E0B"]].map(([l,v,c])=><div key={l} className="bx" style={{textAlign:"center"}}><div style={{fontSize:8,color:"#3E4A5A",textTransform:"uppercase"}}>{l}</div><div className="mn" style={{fontSize:15,fontWeight:700,color:c}}>{fS(v)}</div></div>)}
          </div></div>
        </div>}
      </main>
    </div>
    {sel&&<div className="ov" onClick={()=>setSel(null)}><div className="mo" onClick={e=>e.stopPropagation()}>
      {(()=>{const v=sel,l=liq[v.id],tr=gU(v.tr,unis),rt=gR(v.ruta,rutas),cl=gCl(v.cli,clis),cd=gC(v.con,conds),co=KCOLS.find(x=>x.k===v.est);return(<>
        <div style={{padding:"10px 16px",borderBottom:"1px solid #181E2A",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0A0C12"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <img src={LOGO} alt="NTF" style={{height:20}}/>
            <span className="mn" style={{fontSize:15,fontWeight:700,color:co?.c}}>{v.cod}</span>
            <B t={`${co?.i} ${co?.l}`} bg={`${co?.c}22`} c={co?.c}/><B t={v.serv} bg={v.serv==="INTL"?"#312E81":"#181E2A"} c={v.serv==="INTL"?"#A5B4FC":"#6B7A8D"}/>
          </div>
          <div style={{display:"flex",gap:4}}><IB i="🗑️" c="#F87171" t="Eliminar viaje" onClick={()=>setCfm({t:"viaje",id:v.id,l:v.cod})}/><button className="bt" onClick={()=>setSel(null)}>✕</button></div>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid #181E2A",padding:"0 16px",background:"#0A0C12"}}>
          {[["resumen","📊 Resumen"],["gastos","📕 Gastos"],["ingresos","📗 Ingresos"],["bolsa","💰 Bolsa"]].map(([k,la])=><div key={k} className={`tb ${tab===k?"ac":""}`} onClick={()=>setTab(k)}>{la}</div>)}
        </div>
        <div style={{padding:"10px 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:5,marginBottom:10}}>
            {[["Ruta",rt?`${rt.o}→${rt.d}`:"—"],["Tracto",tr?.pl],["Conductor",cd?.nm],["Cliente",cl?.rs],["Peso",`${v.peso}t · ${rt?.km}km`]].map(([a,b])=><div key={a} className="bx"><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>{a}</div><div style={{fontSize:10,fontWeight:600,color:"#E0E7F0"}}>{b}</div></div>)}
          </div>
          {tab==="resumen"&&<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
              <div style={{background:"#064E3B22",border:"1px solid #064E3B44",borderRadius:8,padding:10}}><div style={{fontSize:8,color:"#6EE7B7",textTransform:"uppercase",fontWeight:600}}>Ingresos Neto</div><div className="mn" style={{fontSize:22,fontWeight:700,color:"#34D399"}}>{fS(l.tI)}</div><div style={{fontSize:8,color:"#3E4A5A"}}>Bruto: {fS(l.tIB)}</div></div>
              <div style={{background:"#7F1D1D22",border:"1px solid #7F1D1D44",borderRadius:8,padding:10}}><div style={{fontSize:8,color:"#FCA5A5",textTransform:"uppercase",fontWeight:600}}>Costos Base Imp.</div><div className="mn" style={{fontSize:22,fontWeight:700,color:"#F87171"}}>{fS(l.tG)}</div><div style={{fontSize:8,color:"#3E4A5A"}}>c/IGV: {fS(l.tGI)}</div></div>
            </div>
            {[["⛽ Combustible",l.cP,"#F59E0B"],["📕 Total Costos",l.tG,"#F87171"]].map(([a,val,c2])=><div key={a} style={{marginBottom:3}}><div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:1}}><span style={{color:"#6B7A8D"}}>{a}</span><span className="mn" style={{color:c2,fontWeight:600}}>{fS(val)}</span></div><div className="bar"><div className="bf" style={{width:`${l.tG>0?(val/l.tG)*100:0}%`,background:c2}}/></div></div>)}
            <div style={{background:l.p>=20?"#064E3B22":"#7F1D1D22",border:`1px solid ${l.p>=20?"#064E3B":"#7F1D1D"}44`,borderRadius:8,padding:10,marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
              {[["MARGEN",fS(l.m),l.p>=20?"#34D399":"#F87171"],["MARGEN %",n2(l.p)+"%",l.p>=20?"#34D399":"#F87171"],["S//KM",fS(l.ck),"#F59E0B"],["S//TON",fS(l.ct),"#818CF8"]].map(([a,b,c2])=><div key={a} style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase",fontWeight:600}}>{a}</div><div className="mn" style={{fontSize:14,fontWeight:700,color:c2}}>{b}</div></div>)}
            </div>
          </>}
          {tab==="gastos"&&<><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>Gastos documentados — Base Imp. para costeo</div>
            <table className="tbl"><thead><tr><th>Categoría</th><th>Doc</th><th>Nro</th><th>Proveedor</th><th>Base</th><th>IGV</th><th>Total</th><th></th></tr></thead><tbody>
            {v.gastos.map((g,i)=><tr key={i}><td style={{fontWeight:600,fontSize:9}}>{g.cat}</td><td><B t={g.tdoc} bg={dC(g.tdoc)[0]} c={dC(g.tdoc)[1]}/></td><td className="mn" style={{fontSize:8}}>{g.ndoc}</td><td style={{fontSize:9}}>{g.prov}</td><td className="mn" style={{fontWeight:600}}>{fS(g.base)}</td><td className="mn" style={{color:g.igv>0?"#F59E0B":"#2A3344"}}>{fS(g.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(g.tot)}</td><td><IB i="✏️" t="Editar"/><IB i="🗑️" c="#F87171" t="Eliminar"/></td></tr>)}
            </tbody></table><div style={{marginTop:6,padding:6,background:"#181E2A44",borderRadius:4,fontSize:9,color:"#6B7A8D"}}>Costeo usa Base Imponible (sin IGV). Fact. extranjeras: IGV=0.</div></>}
          {tab==="ingresos"&&<><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>Ingresos facturados / por facturar</div>
            <table className="tbl"><thead><tr><th>Doc</th><th>Serie-Nro</th><th>Fecha</th><th>Cliente</th><th>Base</th><th>IGV</th><th>Total</th><th>Estado</th><th></th></tr></thead><tbody>
            {v.ingresos.map((i,x)=>{const c2=gCl(i.cli,clis);return(<tr key={x}><td><B t={i.tdoc} bg={dC(i.tdoc)[0]} c={dC(i.tdoc)[1]}/></td><td className="mn" style={{fontWeight:600}}>{i.serie}-{i.nro}</td><td className="mn">{fD(i.fecha)}</td><td style={{fontSize:9}}>{c2?.rs}</td><td className="mn">{fS(i.base)}</td><td className="mn" style={{color:i.igv>0?"#F59E0B":"#2A3344"}}>{fS(i.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(i.tot)}</td>
              <td><B t={i.estado==="COBRADO"?"COBRADO":i.estado==="PENDIENTE"?"PEND.COBRO":"PEND.FACT"} bg={i.estado==="COBRADO"?"#064E3B":i.estado==="PENDIENTE"?"#7F1D1D44":"#3B076444"} c={i.estado==="COBRADO"?"#6EE7B7":i.estado==="PENDIENTE"?"#FCA5A5":"#C4B5FD"}/></td><td><IB i="✏️" t="Editar"/></td></tr>)})}
            </tbody></table></>}
          {tab==="bolsa"&&<><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>Bolsa de Viaje</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Soles</div><div className="mn" style={{fontSize:15,fontWeight:700,color:"#34D399"}}>{fS(v.bolsa.pen)}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Dólares</div><div className="mn" style={{fontSize:15,fontWeight:700,color:"#93C5FD"}}>${fN(v.bolsa.usd)}</div><div style={{fontSize:8,color:"#3E4A5A"}}>TC: {v.bolsa.tcUsd}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Total PEN</div><div className="mn" style={{fontSize:15,fontWeight:700,color:"#F59E0B"}}>{fS(bTP(v.bolsa))}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Bolsa</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#F59E0B"}}>{fS(bTP(v.bolsa))}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Gastado</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#F87171"}}>{fS(l.tGI)}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Saldo</div><div className="mn" style={{fontSize:14,fontWeight:700,color:bTP(v.bolsa)-l.tGI>=0?"#34D399":"#F87171"}}>{fS(bTP(v.bolsa)-l.tGI)}</div></div>
            </div>
            <div style={{marginTop:6,padding:6,background:"#78350F22",borderRadius:4,fontSize:9,color:"#FDE68A"}}>Bolsa incluye dinero para combustible Ecuador. Factura extranjera alimenta costeo real.</div></>}
        </div>
      </>)})()}
    </div></div>}
    {vjModal&&(()=>{
      const isEdit=vjModal.mode==="edit";
      const ev=isEdit?vjModal.vj:null;
      const nId=isEdit?ev.id:nxId(viajes);
      const nCod=isEdit?ev.cod:`VJ-2026-${String(nId).padStart(4,"0")}`;
      const fm=vjModal._fm||{
        tr:ev?.tr||"",con:ev?.con||"",ruta:ev?.ruta||"",cli:ev?.cli||"",serv:ev?.serv||"INTL",
        peso:ev?.peso||0,carga:ev?.carga||"",est:ev?.est||"PROGRAMADO",
        fP:ev?.fP||TODAY,fS:ev?.fS||null,fL:ev?.fL||null,
        semi:ev?.semi||"",contenedor:ev?.contenedor||"",otro:ev?.otro||"",
        bolsaPen:ev?.bolsa?.pen||0,bolsaUsd:ev?.bolsa?.usd||0,bolsaTc:ev?.bolsa?.tcUsd||3.798,
        estMotivo:ev?.estDetalle?.motivo||"",estUbicacion:ev?.estDetalle?.ubicacion||"",estDesde:ev?.estDetalle?.desde||"",estHasta:ev?.estDetalle?.hasta||""
      };
      const setFm=(v)=>setVjModal(p=>({...p,_fm:typeof v==="function"?v(p._fm||fm):v}));
      const updF=(k,val)=>setFm(p=>({...p,[k]:val}));
      const selRuta=gR(parseInt(fm.ruta),rutas);
      const needsDet=["ESPERA_CARGA","MANTENIMIENTO","SIN_MOVIMIENTO"].includes(fm.est);
      const bTot=(parseFloat(fm.bolsaPen)||0)+((parseFloat(fm.bolsaUsd)||0)*(parseFloat(fm.bolsaTc)||0));
      const doSave=()=>{
        if(!fm.tr||!fm.con||!fm.ruta){alert("Complete unidad de transporte, conductor y ruta");return}
        const d={id:nId,cod:nCod,fP:fm.fP,fS:fm.fS,fL:fm.fL,tr:parseInt(fm.tr),con:parseInt(fm.con),ruta:parseInt(fm.ruta),cli:parseInt(fm.cli)||null,serv:fm.serv,peso:parseFloat(fm.peso)||0,carga:fm.carga,est:fm.est,
          semi:parseInt(fm.semi)||null,contenedor:fm.contenedor||"",otro:fm.otro||"",
          bolsa:{pen:parseFloat(fm.bolsaPen)||0,orPen:ev?.bolsa?.orPen||null,usd:parseFloat(fm.bolsaUsd)||0,orUsd:ev?.bolsa?.orUsd||null,tcUsd:parseFloat(fm.bolsaTc)||3.798,estLiq:ev?.bolsa?.estLiq||"PENDIENTE"},
          gastos:ev?.gastos||[],ingresos:ev?.ingresos||[],
          estDetalle:needsDet?{motivo:fm.estMotivo,ubicacion:fm.estUbicacion,desde:fm.estDesde,hasta:fm.estHasta}:null};
        saveVj(d)};
      const IS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      const SS={...IS,appearance:"none"};
      const LB={fontSize:8,color:"#3E4A5A",fontWeight:600,textTransform:"uppercase",marginBottom:2,display:"block"};
      const QB=({onClick,title})=><button title={title} onClick={e=>{e.preventDefault();onClick()}} style={{background:"#1E3A5F",border:"none",color:"#93C5FD",cursor:"pointer",fontSize:10,padding:"2px 6px",borderRadius:3,fontWeight:600,marginLeft:4,verticalAlign:"middle"}}>+</button>;
      return(<div className="ov" onClick={()=>setVjModal(null)}><div className="mo" style={{maxWidth:660}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"10px 16px",borderBottom:"1px solid #181E2A",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0A0C12"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14}}>🚛</span><span className="mn" style={{fontSize:14,fontWeight:700,color:"#F59E0B"}}>{nCod}</span><span style={{fontSize:11,color:"#6B7A8D"}}>{isEdit?"Editar Viaje":"Nuevo Viaje"}</span></div>
          <button className="bt" onClick={()=>setVjModal(null)}>✕</button>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid #181E2A",padding:"0 16px",background:"#0A0C12",flexWrap:"wrap"}}>
          {[["general","🚛 General"],["equipo","🔗 Equipo"],["ruta","🗺️ Ruta"],["bolsa","💰 Bolsa"],["estado","📊 Estado"]].map(([k,la])=><div key={k} className={`tb ${vjTab===k?"ac":""}`} onClick={()=>setVjTab(k)} style={{cursor:"pointer"}}>{la}</div>)}
        </div>
        <div style={{padding:"12px 16px",maxHeight:"55vh",overflowY:"auto"}}>
          {vjTab==="general"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div><label style={LB}>Ruta * <QB onClick={()=>setQuickAdd({type:"ruta",fields:{o:"",d:"",tp:"LOCAL",km:0}})} title="Nueva ruta"/></label><select value={fm.ruta} onChange={e=>{updF("ruta",e.target.value);const r=gR(parseInt(e.target.value),rutas);if(r)updF("serv",r.tp)}} style={SS}><option value="">Seleccionar...</option>{rutas.map(r=><option key={r.id} value={r.id}>{r.o} → {r.d} ({r.tp}) {r.km}km</option>)}</select></div>
              <div><label style={LB}>Cliente <QB onClick={()=>setQuickAdd({type:"cliente",fields:{rs:"",ruc:"",pa:"PE"}})} title="Nuevo cliente"/></label><select value={fm.cli} onChange={e=>updF("cli",e.target.value)} style={SS}><option value="">Seleccionar...</option>{clis.map(c=><option key={c.id} value={c.id}>{c.rs} ({c.pa})</option>)}</select></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              <div><label style={LB}>Tipo</label><div style={{marginTop:4}}><B t={fm.serv} bg={fm.serv==="INTL"?"#312E81":"#181E2A"} c={fm.serv==="INTL"?"#A5B4FC":"#6B7A8D"}/></div></div>
              <div><label style={LB}>Carga</label><input value={fm.carga} onChange={e=>updF("carga",e.target.value)} style={IS} placeholder="Ej: Frutas"/></div>
              <div><label style={LB}>Peso (ton)</label><input type="number" value={fm.peso} onChange={e=>updF("peso",e.target.value)} style={IS} step="0.5" min="0"/></div>
            </div>
            <div><label style={LB}>Fecha Programada</label><input type="date" value={fm.fP} onChange={e=>updF("fP",e.target.value)} style={{...IS,width:"auto"}}/></div>
          </div>}
          {vjTab==="equipo"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:2}}>Asignación de equipo de transporte</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div><label style={LB}>Unidad de Transporte * <QB onClick={()=>setQuickAdd({type:"unidad",fields:{pl:"",mk:"INTL"}})} title="Nueva unidad"/></label><select value={fm.tr} onChange={e=>updF("tr",e.target.value)} style={SS}><option value="">Seleccionar...</option>{unis.map(u=><option key={u.id} value={u.id}>🚛 {u.pl} ({u.mk})</option>)}</select></div>
              <div><label style={LB}>Conductor * <QB onClick={()=>setQuickAdd({type:"conductor",fields:{nm:""}})} title="Nuevo conductor"/></label><select value={fm.con} onChange={e=>updF("con",e.target.value)} style={SS}><option value="">Seleccionar...</option>{conds.map(c=><option key={c.id} value={c.id}>👤 {c.nm}</option>)}</select></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div><label style={LB}>Semirremolque <QB onClick={()=>setQuickAdd({type:"semi",fields:{pl:"",tipo:"PLATAFORMA"}})} title="Nuevo semi"/></label><select value={fm.semi} onChange={e=>updF("semi",e.target.value)} style={SS}><option value="">Sin asignar</option>{semis.map(s=><option key={s.id} value={s.id}>🔗 {s.pl} ({s.tipo})</option>)}</select></div>
              <div><label style={LB}>Contenedor / Nro</label><input value={fm.contenedor} onChange={e=>updF("contenedor",e.target.value)} style={IS} placeholder="Ej: MSCU1234567"/></div>
            </div>
            <div><label style={LB}>Otro equipo / Notas</label><input value={fm.otro} onChange={e=>updF("otro",e.target.value)} style={IS} placeholder="Ej: GPS, precintos, etc."/></div>
            {fm.tr&&<div className="bx" style={{marginTop:4}}>
              <div style={{fontSize:8,color:"#3E4A5A",fontWeight:600,marginBottom:4}}>EQUIPO ASIGNADO</div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:9}}>
                <span>🚛 <strong style={{color:"#E0E7F0"}}>{gU(parseInt(fm.tr),unis)?.pl||"—"}</strong> ({gU(parseInt(fm.tr),unis)?.mk})</span>
                {fm.con&&<span>👤 <strong style={{color:"#E0E7F0"}}>{gC(parseInt(fm.con),conds)?.nm||"—"}</strong></span>}
                {fm.semi&&<span>🔗 <strong style={{color:"#E0E7F0"}}>{gSm(parseInt(fm.semi),semis)?.pl||"—"}</strong></span>}
                {fm.contenedor&&<span>📦 <strong style={{color:"#E0E7F0"}}>{fm.contenedor}</strong></span>}
              </div>
            </div>}
          </div>}
          {vjTab==="ruta"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {selRuta?<div className="bx" style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>🗺️</span>
              <div><div style={{fontSize:12,fontWeight:700,color:"#E0E7F0"}}>{selRuta.o} → {selRuta.d}</div><div style={{display:"flex",gap:10,fontSize:9,color:"#3E4A5A",marginTop:2}}><span>📍 {selRuta.km} km</span><span>Código: {selRuta.c}</span><B t={selRuta.tp} bg={selRuta.tp==="INTL"?"#312E81":"#181E2A"} c={selRuta.tp==="INTL"?"#A5B4FC":"#6B7A8D"}/></div></div>
            </div>:<div className="bx" style={{textAlign:"center",color:"#3E4A5A",fontSize:10}}>Seleccione una ruta en General</div>}
            {selRuta&&<div className="bx">
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <span style={{background:"#34D399",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:9,fontWeight:600}}>📍 {selRuta.o}</span>
                <span style={{color:"#3E4A5A",flex:1,textAlign:"center",borderBottom:"1px dashed #252D3A",fontSize:8}}>{selRuta.km} km</span>
                <span style={{background:"#F59E0B",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:9,fontWeight:600}}>🏁 {selRuta.d}</span>
              </div>
            </div>}
          </div>}
          {vjTab==="bolsa"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              <div><label style={LB}>Soles (PEN)</label><input type="number" value={fm.bolsaPen} onChange={e=>updF("bolsaPen",e.target.value)} style={IS} step="0.01" min="0"/></div>
              <div><label style={LB}>Dólares (USD)</label><input type="number" value={fm.bolsaUsd} onChange={e=>updF("bolsaUsd",e.target.value)} style={IS} step="0.01" min="0"/></div>
              <div><label style={LB}>TC USD</label><input type="number" value={fm.bolsaTc} onChange={e=>updF("bolsaTc",e.target.value)} style={IS} step="0.001" min="0"/></div>
            </div>
            <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:8,color:"#3E4A5A",textTransform:"uppercase"}}>Total Bolsa PEN</div><div className="mn" style={{fontSize:22,fontWeight:700,color:"#F59E0B"}}>{fS(bTot)}</div></div>
          </div>}
          {vjTab==="estado"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div><label style={LB}>Estado del Viaje</label>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(115px,1fr))",gap:4,marginTop:4}}>
                {KCOLS.map(e=><button key={e.k} onClick={()=>updF("est",e.k)} style={{padding:"5px 7px",borderRadius:5,border:fm.est===e.k?`2px solid ${e.c}`:"1px solid #181E2A",background:fm.est===e.k?`${e.c}15`:"#0E1219",color:fm.est===e.k?e.c:"#3E4A5A",cursor:"pointer",fontSize:9,fontWeight:fm.est===e.k?600:400,display:"flex",alignItems:"center",gap:4,fontFamily:"inherit"}}><span>{e.i}</span>{e.l}</button>)}
              </div>
            </div>
            {needsDet&&<div style={{background:`${KCOLS.find(e=>e.k===fm.est)?.c}08`,border:`1px solid ${KCOLS.find(e=>e.k===fm.est)?.c}22`,borderRadius:6,padding:10}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><span style={{fontSize:14}}>{KCOLS.find(e=>e.k===fm.est)?.i}</span><span style={{fontSize:11,fontWeight:600,color:KCOLS.find(e=>e.k===fm.est)?.c}}>Detalle: {KCOLS.find(e=>e.k===fm.est)?.l}</span></div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <div><label style={LB}>Motivo *</label><input value={fm.estMotivo} onChange={e=>updF("estMotivo",e.target.value)} style={IS} placeholder={fm.est==="ESPERA_CARGA"?"Ej: Esperando confirmación":"Ej: Cambio de llantas"}/></div>
                <div><label style={LB}>Ubicación *</label><input value={fm.estUbicacion} onChange={e=>updF("estUbicacion",e.target.value)} style={IS} placeholder="Ej: Terminal Chiclayo"/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div><label style={LB}>Desde</label><input type="date" value={fm.estDesde} onChange={e=>updF("estDesde",e.target.value)} style={IS}/></div>
                  <div><label style={LB}>Hasta (est.)</label><input type="date" value={fm.estHasta} onChange={e=>updF("estHasta",e.target.value)} style={IS}/></div>
                </div>
              </div>
            </div>}
          </div>}
        </div>
        <div style={{padding:"10px 16px",borderTop:"1px solid #181E2A",display:"flex",justifyContent:"space-between"}}>
          <button className="bt" onClick={()=>setVjModal(null)}>Cancelar</button>
          <button className="bt ba" style={{fontWeight:600}} onClick={doSave}>{isEdit?"💾 Guardar":"➕ Crear Viaje"}</button>
        </div>
      </div></div>)})()}
    {gastoModal&&(()=>{const isEd=!!gastoModal.gasto;const gf=gastoModal._f||{cat:gastoModal.gasto?.cat||"Comb.Local",tdoc:gastoModal.gasto?.tdoc||"FACTURA",ndoc:gastoModal.gasto?.ndoc||"",prov:gastoModal.gasto?.prov||"",provTdoc:gastoModal.gasto?.provTdoc||"RUC",provNdoc:gastoModal.gasto?.provNdoc||"",mon:gastoModal.gasto?.mon||"PEN",monto:gastoModal.gasto?.monto||0,tc:gastoModal.gasto?.tc||1,igvPct:gastoModal.gasto?.igv>0?18:0};
      const setGf=v=>setGastoModal(p=>({...p,_f:typeof v==="function"?v(p._f||gf):v}));const upG=(k,val)=>setGf(p=>({...p,[k]:val}));
      const monto=parseFloat(gf.monto)||0,tc=parseFloat(gf.tc)||1,igvPct=parseFloat(gf.igvPct)||0;
      const totBruto=monto*tc,base=igvPct>0?totBruto/(1+igvPct/100):totBruto,igv=totBruto-base;
      const vj=viajes.find(x=>x.id===gastoModal.vjId),bolsaMon=gf.mon==="PEN"?vj?.bolsa?.pen:vj?.bolsa?.usd,
        gastMon=gf.mon==="PEN"?vj?.gastos.filter(g=>g.mon==="PEN").reduce((s,g)=>s+g.tot,0):vj?.gastos.filter(g=>g.mon!=="PEN").reduce((s,g)=>s+g.monto,0),
        dispMon=(bolsaMon||0)-(gastMon||0);
      const GIS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      const doSaveG=()=>{if(!gf.cat||monto<=0){alert("Complete categoría y monto");return}
        const g={cat:gf.cat,tdoc:gf.tdoc,ndoc:gf.ndoc,prov:gf.prov,provTdoc:gf.provTdoc,provNdoc:gf.provNdoc,mon:gf.mon,monto,tc,base:Math.round(base*100)/100,igv:Math.round(igv*100)/100,tot:Math.round(totBruto*100)/100};
        if(isEd)updGasto(gastoModal.vjId,gastoModal.idx,g);else addGasto(gastoModal.vjId,g);setGastoModal(null)};
      return(<div className="ov" style={{zIndex:55}} onClick={()=>setGastoModal(null)}><div className="mo" style={{maxWidth:540,padding:16}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:6}}>{isEd?"✏️ Editar Gasto":"➕ Nuevo Gasto"} — {vj?.cod}</div>
        <div style={{display:"flex",gap:8,marginBottom:8,fontSize:9}}><span style={{color:"#34D399"}}>Bolsa {gf.mon}: {gf.mon==="PEN"?fS(bolsaMon||0):"$"+fN(bolsaMon||0)}</span><span style={{color:dispMon>=0?"#6B7A8D":"#F87171"}}>Disponible: {gf.mon==="PEN"?fS(dispMon):"$"+fN(dispMon)}</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Categoría *</label><select value={gf.cat} onChange={e=>upG("cat",e.target.value)} style={GIS}>{CATS_G.map(c=><option key={c}>{c}</option>)}</select></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Tipo Doc</label><select value={gf.tdoc} onChange={e=>upG("tdoc",e.target.value)} style={GIS}>{TDOCS.map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Nro Documento</label><input value={gf.ndoc} onChange={e=>upG("ndoc",e.target.value)} style={GIS} placeholder="Ej: F001-1234"/></div>
          <div style={{fontSize:9,fontWeight:600,color:"#6B7A8D",marginTop:2}}>Proveedor</div>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Razón Social / Nombre</label><input value={gf.prov} onChange={e=>upG("prov",e.target.value)} style={GIS} placeholder="Ej: Grifo Repsol"/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Tipo ID</label><select value={gf.provTdoc} onChange={e=>upG("provTdoc",e.target.value)} style={GIS}>{TDOC_ID.map(t=><option key={t}>{t}</option>)}</select></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Nro ID</label><input value={gf.provNdoc} onChange={e=>upG("provNdoc",e.target.value)} style={GIS} placeholder="Ej: 20481234567"/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Moneda</label><select value={gf.mon} onChange={e=>{upG("mon",e.target.value);if(e.target.value==="PEN")upG("tc",1)}} style={GIS}><option>PEN</option><option>USD</option><option>COP</option></select></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Monto *</label><input type="number" value={gf.monto} onChange={e=>upG("monto",e.target.value)} style={GIS} step="0.01" min="0"/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>TC</label><input type="number" value={gf.tc} onChange={e=>upG("tc",e.target.value)} style={GIS} step="0.001" disabled={gf.mon==="PEN"}/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>IGV %</label><select value={gf.igvPct} onChange={e=>upG("igvPct",e.target.value)} style={GIS}><option value={0}>0%</option><option value={18}>18%</option></select></div>
          </div>
          <div className="bx" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:2}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A"}}>BASE</div><div className="mn" style={{fontSize:12,fontWeight:700,color:"#F59E0B"}}>{fS(base)}</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A"}}>IGV</div><div className="mn" style={{fontSize:12,fontWeight:700,color:igv>0?"#818CF8":"#2A3344"}}>{fS(igv)}</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A"}}>TOTAL PEN</div><div className="mn" style={{fontSize:12,fontWeight:700,color:"#34D399"}}>{fS(totBruto)}</div></div>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:4}}>
            <button className="bt" onClick={()=>setGastoModal(null)}>Cancelar</button>
            <button className="bt ba" onClick={doSaveG}>{isEd?"💾 Guardar":"➕ Agregar"}</button>
          </div>
        </div>
      </div></div>)})()}
    {bolsaModal&&(()=>{const v=viajes.find(x=>x.id===bolsaModal.vjId);const bf=bolsaModal._f||{orPen:v?.bolsa?.orPen||1,pen:v?.bolsa?.pen||0,orUsd:v?.bolsa?.orUsd||3,usd:v?.bolsa?.usd||0,tc:v?.bolsa?.tcUsd||3.798};
      const setBf=v2=>setBolsaModal(p=>({...p,_f:typeof v2==="function"?v2(p._f||bf):v2}));const upB=(k,val)=>setBf(p=>({...p,[k]:val}));
      const BIS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      return(<div className="ov" style={{zIndex:55}} onClick={()=>setBolsaModal(null)}><div className="mo" style={{maxWidth:480,padding:16}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>💰 Habilitar Bolsa — {v?.cod}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{padding:8,background:"#064E3B11",border:"1px solid #064E3B33",borderRadius:6}}>
            <div style={{fontSize:10,fontWeight:600,color:"#34D399",marginBottom:6}}>🇵🇪 Bolsa en Soles (PEN)</div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8}}>
              <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Origen PEN</label><select value={bf.orPen} onChange={e=>upB("orPen",parseInt(e.target.value))} style={BIS}>{cajas.map(c=><option key={c.id} value={c.id}>{c.tipo==="BANCO"?"🏦":"💰"} {c.nm} — S/ {fN(c.saldo)}</option>)}</select></div>
              <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Monto S/</label><input type="number" value={bf.pen} onChange={e=>upB("pen",e.target.value)} style={BIS} step="0.01"/></div>
            </div>
          </div>
          <div style={{padding:8,background:"#1E3A5F11",border:"1px solid #1E3A5F33",borderRadius:6}}>
            <div style={{fontSize:10,fontWeight:600,color:"#93C5FD",marginBottom:6}}>🇺🇸 Bolsa en Dólares (USD)</div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8}}>
              <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Origen USD</label><select value={bf.orUsd} onChange={e=>upB("orUsd",parseInt(e.target.value))} style={BIS}>{cajas.map(c=><option key={c.id} value={c.id}>{c.tipo==="BANCO"?"🏦":"💰"} {c.nm} — $ {fN(c.saldoUsd||0)}</option>)}</select></div>
              <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Monto $</label><input type="number" value={bf.usd} onChange={e=>upB("usd",e.target.value)} style={BIS} step="0.01"/></div>
              <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>TC</label><input type="number" value={bf.tc} onChange={e=>upB("tc",e.target.value)} style={BIS} step="0.001"/></div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="bt" onClick={()=>setBolsaModal(null)}>Cancelar</button>
            <button className="bt ba" onClick={()=>{const pen=parseFloat(bf.pen)||0,usd=parseFloat(bf.usd)||0,tc=parseFloat(bf.tc)||1;
              setCajas(p=>p.map(c=>{let s={...c};if(c.id===bf.orPen)s.saldo=c.saldo-pen;if(c.id===bf.orUsd)s.saldoUsd=(c.saldoUsd||0)-usd;return s}));
              setBolsaOrigen(bolsaModal.vjId,bf.orPen,pen,bf.orUsd,usd,tc);setBolsaModal(null)}}>✅ Asignar Bolsa</button>
          </div>
        </div>
      </div></div>)})()}
    {saldoModal&&(()=>{const v=viajes.find(x=>x.id===saldoModal.vjId);const sf=saldoModal._f||{accionPen:"DEVUELTO",destPenId:1,accionUsd:"DEVUELTO",destUsdId:3};
      const setSf=v2=>setSaldoModal(p=>({...p,_f:typeof v2==="function"?v2(p._f||sf):v2}));
      const SIS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      return(<div className="ov" style={{zIndex:55}} onClick={()=>setSaldoModal(null)}><div className="mo" style={{maxWidth:480,padding:16}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:8}}>🔒 Cerrar Liquidación — {v?.cod}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div className="bx" style={{textAlign:"center",borderTop:"2px solid #34D399"}}><div style={{fontSize:7,color:"#3E4A5A"}}>SALDO PEN</div><div className="mn" style={{fontSize:16,fontWeight:700,color:saldoModal.sPen>=0?"#34D399":"#F87171"}}>{fS(saldoModal.sPen)}</div></div>
          <div className="bx" style={{textAlign:"center",borderTop:"2px solid #93C5FD"}}><div style={{fontSize:7,color:"#3E4A5A"}}>SALDO USD</div><div className="mn" style={{fontSize:16,fontWeight:700,color:saldoModal.sUsd>=0?"#93C5FD":"#F87171"}}>${fN(saldoModal.sUsd)}</div></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {saldoModal.sPen>0&&<div style={{padding:8,background:"#064E3B11",border:"1px solid #064E3B33",borderRadius:6}}>
            <div style={{fontSize:9,fontWeight:600,color:"#34D399",marginBottom:4}}>Saldo PEN: {fS(saldoModal.sPen)}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {[["DEVUELTO","💰 Devolver"],["ARRASTRE","🔄 Arrastrar"]].map(([k,l])=><button key={k} onClick={()=>setSf(p=>({...p,accionPen:k}))} style={{padding:"4px",borderRadius:4,border:sf.accionPen===k?"2px solid #34D399":"1px solid #181E2A",background:sf.accionPen===k?"#064E3B22":"#0E1219",color:sf.accionPen===k?"#34D399":"#3E4A5A",cursor:"pointer",fontSize:9,fontFamily:"inherit"}}>{l}</button>)}
            </div>
            {sf.accionPen==="DEVUELTO"&&<select value={sf.destPenId} onChange={e=>setSf(p=>({...p,destPenId:parseInt(e.target.value)}))} style={{...SIS,marginTop:4}}>{cajas.map(c=><option key={c.id} value={c.id}>{c.nm}</option>)}</select>}
          </div>}
          {saldoModal.sUsd>0&&<div style={{padding:8,background:"#1E3A5F11",border:"1px solid #1E3A5F33",borderRadius:6}}>
            <div style={{fontSize:9,fontWeight:600,color:"#93C5FD",marginBottom:4}}>Saldo USD: ${fN(saldoModal.sUsd)}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {[["DEVUELTO","💰 Devolver"],["ARRASTRE","🔄 Arrastrar"]].map(([k,l])=><button key={k} onClick={()=>setSf(p=>({...p,accionUsd:k}))} style={{padding:"4px",borderRadius:4,border:sf.accionUsd===k?"2px solid #93C5FD":"1px solid #181E2A",background:sf.accionUsd===k?"#1E3A5F22":"#0E1219",color:sf.accionUsd===k?"#93C5FD":"#3E4A5A",cursor:"pointer",fontSize:9,fontFamily:"inherit"}}>{l}</button>)}
            </div>
            {sf.accionUsd==="DEVUELTO"&&<select value={sf.destUsdId} onChange={e=>setSf(p=>({...p,destUsdId:parseInt(e.target.value)}))} style={{...SIS,marginTop:4}}>{cajas.map(c=><option key={c.id} value={c.id}>{c.nm}</option>)}</select>}
          </div>}
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:4}}>
            <button className="bt" onClick={()=>setSaldoModal(null)}>Cancelar</button>
            <button className="bt ba" onClick={()=>cerrarLiq(saldoModal.vjId,sf.accionPen,sf.destPenId,sf.accionUsd,sf.destUsdId)}>🔒 Cerrar Liquidación</button>
          </div>
        </div>
      </div></div>)})()}
    {quickAdd&&<div className="ov" style={{zIndex:60}} onClick={()=>setQuickAdd(null)}><div className="mo" style={{maxWidth:420,padding:16}} onClick={e=>e.stopPropagation()}>
      <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>➕ {quickAdd.type==="unidad"?"Nueva Unidad de Transporte":quickAdd.type==="conductor"?"Nuevo Conductor":quickAdd.type==="ruta"?"Nueva Ruta":quickAdd.type==="cliente"?"Nuevo Cliente":quickAdd.type==="caja"?"Nueva Caja/Banco":"Nuevo Semirremolque"}</div>
      {(()=>{const QIS={width:"100%",padding:"6px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:11,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
        const QL={fontSize:9,color:"#6B7A8D",marginBottom:2,display:"block"};
        const upQ=(k,v)=>setQuickAdd(p=>({...p,fields:{...p.fields,[k]:v}}));
        return(<div style={{display:"flex",flexDirection:"column",gap:8}}>
        {quickAdd.type==="unidad"&&<><div><label style={QL}>Placa *</label><input value={quickAdd.fields.pl} onChange={e=>upQ("pl",e.target.value.toUpperCase())} style={QIS} placeholder="Ej: AXX-900"/></div>
          <div><label style={QL}>Marca</label><select value={quickAdd.fields.mk} onChange={e=>upQ("mk",e.target.value)} style={QIS}>{["INTL","VOLVO","KENW","FREIGHT","SCANIA","MACK","OTRO"].map(m=><option key={m}>{m}</option>)}</select></div>
          <button className="bt ba" onClick={()=>{if(!quickAdd.fields.pl){alert("Ingrese placa");return}addUni(quickAdd.fields)}}>✓ Registrar Unidad</button></>}
        {quickAdd.type==="semi"&&<><div><label style={QL}>Placa *</label><input value={quickAdd.fields.pl} onChange={e=>upQ("pl",e.target.value.toUpperCase())} style={QIS} placeholder="Ej: T3S-006"/></div>
          <div><label style={QL}>Tipo</label><select value={quickAdd.fields.tipo} onChange={e=>upQ("tipo",e.target.value)} style={QIS}>{["PLATAFORMA","FURGON","CAMA_BAJA","TOLVA","CISTERNA","PORTACONTENEDOR","OTRO"].map(t=><option key={t}>{t}</option>)}</select></div>
          <button className="bt ba" onClick={()=>{if(!quickAdd.fields.pl){alert("Ingrese placa");return}addSemi(quickAdd.fields)}}>✓ Registrar Semirremolque</button></>}
        {quickAdd.type==="conductor"&&<><div><label style={QL}>Nombre completo *</label><input value={quickAdd.fields.nm} onChange={e=>upQ("nm",e.target.value.toUpperCase())} style={QIS} placeholder="Ej: PEREZ R."/></div>
          <button className="bt ba" onClick={()=>{if(!quickAdd.fields.nm){alert("Ingrese nombre");return}addCond(quickAdd.fields)}}>✓ Registrar Conductor</button></>}
        {quickAdd.type==="ruta"&&<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div><label style={QL}>Origen *</label><input value={quickAdd.fields.o} onChange={e=>upQ("o",e.target.value)} style={QIS} placeholder="Ej: Chiclayo"/></div>
          <div><label style={QL}>Destino *</label><input value={quickAdd.fields.d} onChange={e=>upQ("d",e.target.value)} style={QIS} placeholder="Ej: Quito"/></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div><label style={QL}>Tipo</label><select value={quickAdd.fields.tp} onChange={e=>upQ("tp",e.target.value)} style={QIS}><option value="LOCAL">LOCAL</option><option value="INTL">INTL</option></select></div>
          <div><label style={QL}>Km</label><input type="number" value={quickAdd.fields.km} onChange={e=>upQ("km",parseInt(e.target.value)||0)} style={QIS}/></div></div>
          <button className="bt ba" onClick={()=>{if(!quickAdd.fields.o||!quickAdd.fields.d){alert("Ingrese origen y destino");return}addRuta({...quickAdd.fields,c:(quickAdd.fields.o.slice(0,3)+"-"+quickAdd.fields.d.slice(0,3)).toUpperCase()})}}>✓ Registrar Ruta</button></>}
        {quickAdd.type==="cliente"&&<><div><label style={QL}>Razón Social *</label><input value={quickAdd.fields.rs} onChange={e=>upQ("rs",e.target.value)} style={QIS} placeholder="Ej: Empresa SAC"/></div>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8}}>
          <div><label style={QL}>RUC / ID Fiscal</label><input value={quickAdd.fields.ruc} onChange={e=>upQ("ruc",e.target.value)} style={QIS}/></div>
          <div><label style={QL}>País</label><select value={quickAdd.fields.pa} onChange={e=>upQ("pa",e.target.value)} style={QIS}><option value="PE">PE</option><option value="EC">EC</option><option value="CO">CO</option></select></div></div>
          <button className="bt ba" onClick={()=>{if(!quickAdd.fields.rs){alert("Ingrese razón social");return}addCli(quickAdd.fields)}}>✓ Registrar Cliente</button></>}
        {quickAdd.type==="caja"&&<><div><label style={QL}>Nombre *</label><input value={quickAdd.fields.nm} onChange={e=>upQ("nm",e.target.value)} style={QIS} placeholder="Ej: Caja Oficina, BCP Ahorros"/></div>
          <div><label style={QL}>Tipo</label><select value={quickAdd.fields.tipo} onChange={e=>upQ("tipo",e.target.value)} style={QIS}><option value="CAJA">CAJA</option><option value="BANCO">BANCO</option></select></div>
          <button className="bt ba" onClick={()=>{if(!quickAdd.fields.nm){alert("Ingrese nombre");return}addCaja(quickAdd.fields.nm,quickAdd.fields.tipo);setQuickAdd(null)}}>✓ Registrar Caja/Banco</button></>}
        <button className="bt" style={{marginTop:4}} onClick={()=>setQuickAdd(null)}>Cancelar</button>
      </div>)})()}
    </div></div>}
    {movModal&&(()=>{const mf=movModal;const cj=cajas.find(c=>c.id===mf.cId);
      const MIS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      const upM=(k,v)=>setMovModal(p=>({...p,[k]:v}));const curr=mf.mon==="USD"?(cj?.saldoUsd||0):(cj?.saldo||0);const mt=parseFloat(mf.mt)||0;const ns=mf.tp==="INGRESO"?curr+mt:curr-mt;
      return(<div className="ov" style={{zIndex:55}} onClick={()=>setMovModal(null)}><div className="mo" style={{maxWidth:440,padding:16}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,fontWeight:700,color:mf.tp==="INGRESO"?"#34D399":"#F87171",marginBottom:8}}>{mf.tp==="INGRESO"?"Ingreso":"Egreso"} - {cj?.nm}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Moneda</label><select value={mf.mon} onChange={e=>upM("mon",e.target.value)} style={MIS}><option>PEN</option><option>USD</option></select></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Monto *</label><input type="number" value={mf.mt} onChange={e=>upM("mt",e.target.value)} style={MIS} step="0.01" min="0"/></div>
          </div>
          <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Concepto *</label><input value={mf.con} onChange={e=>upM("con",e.target.value)} style={MIS} placeholder="Cobro factura, Pago proveedor"/></div>
          <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Referencia</label><input value={mf.ref} onChange={e=>upM("ref",e.target.value)} style={MIS} placeholder="VJ-2026-0001"/></div>
          <div className="bx" style={{textAlign:"center",padding:8}}>
            <div style={{fontSize:7,color:"#3E4A5A"}}>SALDO {mf.mon}: {mf.mon==="USD"?"$"+fN(curr):fS(curr)}</div>
            <div style={{fontSize:11,fontWeight:700,color:ns>=0?"#34D399":"#F87171",marginTop:4}}>Nuevo: {mf.mon==="USD"?"$"+fN(ns):fS(ns)}</div>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="bt" onClick={()=>setMovModal(null)}>Cancelar</button>
            <button className="bt ba" onClick={()=>{if(mt<=0||!mf.con){alert("Complete monto y concepto");return}regMov(mf.cId,mf.tp,mf.con,mf.ref,mf.mon,mt);setMovModal(null)}}>Registrar</button>
          </div>
        </div>
      </div></div>)})()}
    {combModal&&(()=>{const isEd=combModal.mode==="edit";const d=isEd?combModal.data:{};
      const cf=combModal._f||{fecha:d.fecha||TODAY,prov:d.prov||"",tdoc:d.tdoc||"FACT_EXT",ndoc:d.ndoc||"",gal:d.gal||0,puUsd:d.puUsd||0,tc:d.tc||3.798,vjId:d.vjId||"",lote:d.lote||"LOT-"+String(nxId(compras)).padStart(3,"0")};
      const upC=(k,v2)=>setCombModal(p=>({...p,_f:{...(p._f||cf),[k]:v2}}));const totU=(parseFloat(cf.gal)||0)*(parseFloat(cf.puUsd)||0);const tot=totU*(parseFloat(cf.tc)||0);const cu=parseFloat(cf.gal)>0?tot/parseFloat(cf.gal):0;
      const CIS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      return(<div className="ov" style={{zIndex:55}} onClick={()=>setCombModal(null)}><div className="mo" style={{maxWidth:500,padding:16}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,fontWeight:700,color:"#F59E0B",marginBottom:8}}>⛽ {isEd?"Editar":"Nueva"} Compra Combustible</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Lote</label><input value={cf.lote} onChange={e=>upC("lote",e.target.value)} style={CIS}/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Fecha</label><input type="date" value={cf.fecha} onChange={e=>upC("fecha",e.target.value)} style={CIS}/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Viaje</label><select value={cf.vjId} onChange={e=>upC("vjId",parseInt(e.target.value)||"")} style={CIS}><option value="">—</option>{viajes.map(v=><option key={v.id} value={v.id}>{v.cod}</option>)}</select></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Proveedor *</label><input value={cf.prov} onChange={e=>upC("prov",e.target.value)} style={CIS} placeholder="PetroEcuador S.A."/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Doc</label><input value={cf.ndoc} onChange={e=>upC("ndoc",e.target.value)} style={CIS} placeholder="001-0045892"/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Galones *</label><input type="number" value={cf.gal} onChange={e=>upC("gal",e.target.value)} style={CIS} step="0.01"/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>P.U. USD *</label><input type="number" value={cf.puUsd} onChange={e=>upC("puUsd",e.target.value)} style={CIS} step="0.01"/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>TC</label><input type="number" value={cf.tc} onChange={e=>upC("tc",e.target.value)} style={CIS} step="0.001"/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A"}}>TOTAL USD</div><div className="mn" style={{fontSize:13,fontWeight:700,color:"#93C5FD"}}>${fN(totU)}</div></div>
            <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A"}}>TOTAL PEN</div><div className="mn" style={{fontSize:13,fontWeight:700,color:"#34D399"}}>{fS(tot)}</div></div>
            <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A"}}>C.U. S//GAL</div><div className="mn" style={{fontSize:13,fontWeight:700,color:"#F59E0B"}}>{fS(cu)}</div></div>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="bt" onClick={()=>setCombModal(null)}>Cancelar</button>
            <button className="bt ba" onClick={()=>{if(!cf.prov||parseFloat(cf.gal)<=0){alert("Complete proveedor y galones");return}saveComb({fecha:cf.fecha,prov:cf.prov,tdoc:cf.tdoc||"FACT_EXT",ndoc:cf.ndoc,gal:parseFloat(cf.gal),puUsd:parseFloat(cf.puUsd),totUsd:totU,tc:parseFloat(cf.tc),base:tot,igv:0,tot:tot,cu:cu,lote:cf.lote,vjId:parseInt(cf.vjId)||null},isEd,combModal.idx)}}>Guardar</button>
          </div>
        </div>
      </div></div>)})()}
    {docModal&&(()=>{const isEd=docModal.mode==="edit";const d=isEd?docModal.data:{};
      const df=docModal._f||{tipo:d.tipo||"FACTURA",nro:d.nro||"",fecha:d.fecha||TODAY,ent:d.ent||"",ref:d.ref||"",desc:d.desc||"",arch:d.arch||""};
      const upD=(k,v2)=>setDocModal(p=>({...p,_f:{...(p._f||df),[k]:v2}}));
      const DIS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      return(<div className="ov" style={{zIndex:55}} onClick={()=>setDocModal(null)}><div className="mo" style={{maxWidth:480,padding:16}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,fontWeight:700,color:"#A78BFA",marginBottom:8}}>📎 {isEd?"Editar":"Nuevo"} Documento</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Tipo</label><select value={df.tipo} onChange={e=>upD("tipo",e.target.value)} style={DIS}>{["FACTURA","FACT_EXT","BOLETA","GUIA_REM","DOC_INT","CONTRATO","POLIZA","SOAT","OTRO"].map(t=><option key={t}>{t}</option>)}</select></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Numero *</label><input value={df.nro} onChange={e=>upD("nro",e.target.value)} style={DIS} placeholder="F001-00234"/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Fecha</label><input type="date" value={df.fecha} onChange={e=>upD("fecha",e.target.value)} style={DIS}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Entidad *</label><input value={df.ent} onChange={e=>upD("ent",e.target.value)} style={DIS} placeholder="NTF, PetroEcuador"/></div>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Referencia</label><input value={df.ref} onChange={e=>upD("ref",e.target.value)} style={DIS} placeholder="VJ-0001, LOT-001"/></div>
          </div>
          <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Descripcion</label><input value={df.desc} onChange={e=>upD("desc",e.target.value)} style={DIS} placeholder="Descripcion del documento"/></div>
          <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Archivo</label><input value={df.arch} onChange={e=>upD("arch",e.target.value)} style={DIS} placeholder="nombre_archivo.pdf"/></div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="bt" onClick={()=>setDocModal(null)}>Cancelar</button>
            <button className="bt ba" onClick={()=>{if(!df.nro||!df.ent){alert("Complete numero y entidad");return}saveDoc({tipo:df.tipo,nro:df.nro,fecha:df.fecha,ent:df.ent,ref:df.ref,desc:df.desc,arch:df.arch||null},isEd,docModal.idx)}}>Guardar</button>
          </div>
        </div>
      </div></div>)})()}
    {almModal&&(()=>{const isEnt=almModal.tp==="ENTRADA";
      const af=almModal._f||{gal:0,cuPen:isEnt?0:almStock.cu,ref:isEnt?"LOT-"+String(nxId(compras)).padStart(3,"0"):"DESP-"+String(nxId(almMov)).padStart(3,"0"),vjRef:"",uni:"",nota:""};
      const upA=(k,v2)=>setAlmModal(p=>({...p,_f:{...(p._f||af),[k]:v2}}));
      const gl=parseFloat(af.gal)||0;const cu2=isEnt?(parseFloat(af.cuPen)||0):almStock.cu;const tot2=Math.round(gl*cu2*100)/100;
      const AIS={width:"100%",padding:"5px 8px",borderRadius:5,border:"1px solid #252D3A",background:"#07080C",color:"#E0E7F0",fontSize:10,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
      return(<div className="ov" style={{zIndex:55}} onClick={()=>setAlmModal(null)}><div className="mo" style={{maxWidth:480,padding:16}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,fontWeight:700,color:isEnt?"#34D399":"#F87171",marginBottom:8}}>{isEnt?"📥 Entrada al Almacén":"📤 Despacho desde Almacén"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {isEnt&&<div style={{padding:6,background:"#064E3B22",borderRadius:4,fontSize:9,color:"#6EE7B7"}}>Registrar descarga de combustible traído de Ecuador por conductor</div>}
          {!isEnt&&<div style={{padding:6,background:"#7F1D1D22",borderRadius:4,fontSize:9,color:"#FCA5A5"}}>Despachar combustible a unidad de ruta local — Stock actual: {fN(almStock.stk)} gal — C.U.: {fS(almStock.cu)}</div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Galones *</label><input type="number" value={af.gal} onChange={e=>upA("gal",e.target.value)} style={AIS} step="0.01" min="0"/></div>
            {isEnt&&<div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>C.U. S//Gal *</label><input type="number" value={af.cuPen} onChange={e=>upA("cuPen",e.target.value)} style={AIS} step="0.01"/></div>}
            {!isEnt&&<div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>C.U. (Prom.)</label><div className="mn" style={{fontSize:12,fontWeight:700,color:"#93C5FD",padding:"5px 0"}}>{fS(almStock.cu)}</div></div>}
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Total S/</label><div className="mn" style={{fontSize:12,fontWeight:700,color:isEnt?"#34D399":"#F87171",padding:"5px 0"}}>{fS(tot2)}</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Ref./Lote</label><input value={af.ref} onChange={e=>upA("ref",e.target.value)} style={AIS}/></div>
            {isEnt&&<div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Viaje origen</label><select value={af.vjRef} onChange={e=>upA("vjRef",e.target.value)} style={AIS}><option value="">—</option>{viajes.filter(v=>v.serv==="INTL").map(v=><option key={v.id} value={v.cod}>{v.cod}</option>)}</select></div>}
            {!isEnt&&<div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Unidad destino</label><select value={af.uni} onChange={e=>upA("uni",parseInt(e.target.value)||"")} style={AIS}><option value="">—</option>{unis.map(u=><option key={u.id} value={u.id}>{u.pl} ({u.mk})</option>)}</select></div>}
          </div>
          <div><label style={{fontSize:8,color:"#3E4A5A",fontWeight:600}}>Nota</label><input value={af.nota} onChange={e=>upA("nota",e.target.value)} style={AIS} placeholder={isEnt?"Descarga conductor...":"Despacho ruta local..."}/></div>
          {!isEnt&&gl>almStock.stk&&<div style={{padding:4,background:"#7F1D1D",borderRadius:4,fontSize:9,color:"#FCA5A5",textAlign:"center"}}>Stock insuficiente ({fN(almStock.stk)} gal disponibles)</div>}
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="bt" onClick={()=>setAlmModal(null)}>Cancelar</button>
            <button className="bt ba" onClick={()=>{if(gl<=0){alert("Ingrese galones");return}if(isEnt&&(parseFloat(af.cuPen)||0)<=0){alert("Ingrese costo unitario");return}if(!isEnt&&gl>almStock.stk){alert("Stock insuficiente");return}addAlmMov(almModal.tp,gl,isEnt?parseFloat(af.cuPen):almStock.cu,af.ref,af.vjRef||null,parseInt(af.uni)||null,af.nota);setAlmModal(null)}}>{isEnt?"📥 Registrar Entrada":"📤 Registrar Despacho"}</button>
          </div>
        </div>
      </div></div>)})()}
    {cfm&&<div className="ov" onClick={()=>setCfm(null)}><div className="mo" style={{maxWidth:400,padding:20}} onClick={e=>e.stopPropagation()}>
      <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:8}}>⚠️ Confirmar eliminación</div>
      <div style={{fontSize:11,color:"#B8C4D4",marginBottom:16}}>¿Eliminar <strong style={{color:"#F59E0B"}}>{cfm.l}</strong>? Esta acción no se puede deshacer.</div>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
        <button className="bt" onClick={()=>setCfm(null)}>Cancelar</button>
        <button className="bt" style={{background:"#7F1D1D",borderColor:"#7F1D1D",color:"#FCA5A5"}} onClick={()=>{if(cfm.t==="viaje")delV(cfm.id);if(cfm.t==="compra")delCo(cfm.id);if(cfm.t==="doc")delDo(cfm.id)}}>🗑️ Eliminar</button>
      </div>
    </div></div>}
  
{/* ═══ MODAL: Tipos de documentos (configurable) ═══ */}
{docTypeModal&&<div className="ov" onClick={()=>setDocTypeModal(false)}><div className="mo" onClick={e=>e.stopPropagation()}>
  <div style={{padding:"10px 14px",borderBottom:"1px solid #181E2A",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
    <div style={{fontWeight:800,color:"#E2E8F0"}}>🧩 Tipos de documentos a controlar</div>
    <button className="bt" onClick={()=>setDocTypeModal(false)}>Cerrar</button>
  </div>
  <div style={{padding:14,display:"grid",gridTemplateColumns:"1fr",gap:10}}>
    <div className="cd" style={{padding:10}}>
      <div style={{fontSize:10,color:"#64748B",marginBottom:8}}>Puedes agregar, editar o eliminar tipos de documento. El semáforo se arma automáticamente.</div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th style={{textAlign:"left",fontSize:9,color:"#3A4255",padding:"6px 6px"}}>Código</th>
              <th style={{textAlign:"left",fontSize:9,color:"#3A4255",padding:"6px 6px"}}>Nombre</th>
              <th style={{textAlign:"center",fontSize:9,color:"#3A4255",padding:"6px 6px"}}>Alerta (días)</th>
              <th style={{textAlign:"right",fontSize:9,color:"#3A4255",padding:"6px 6px"}}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {docTypesCtrl.map((td,i)=>(
              <tr key={td.c} style={{borderTop:"1px solid #1A1F2E"}}>
                <td className="mn" style={{fontSize:11,color:"#93C5FD",padding:"6px 6px"}}>{td.c}</td>
                <td style={{padding:"6px 6px"}}>
                  <input className="in" value={td.n} onChange={e=>setDocTypesCtrl(p=>p.map(x=>x.c===td.c?{...x,n:e.target.value}:x))}/>
                </td>
                <td style={{padding:"6px 6px",textAlign:"center"}}>
                  <input className="in" style={{width:90,textAlign:"center"}} type="number" value={td.w??30} onChange={e=>setDocTypesCtrl(p=>p.map(x=>x.c===td.c?{...x,w:Number(e.target.value||30)}:x))}/>
                </td>
                <td style={{padding:"6px 6px",textAlign:"right"}}>
                  <button className="bt" onClick={()=>{
                    if(!confirm("¿Eliminar este tipo de documento?"))return;
                    setDocTypesCtrl(p=>p.filter(x=>x.c!==td.c));
                    // opcional: limpiar registros existentes
                    setDocCtrl(prev=>{
                      const out={...prev};
                      Object.keys(out).forEach(k=>{
                        if(out[k]?.[td.c]){
                          const uu={...out[k]}; delete uu[td.c]; out[k]=uu;
                        }
                      });
                      return out;
                    });
                  }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Agregar nuevo tipo */}
        <div className="cd" style={{padding:10}}>
          <div style={{fontWeight:800,color:"#E2E8F0",marginBottom:8}}>➕ Agregar nuevo tipo</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <input className="in" placeholder="Nombre (ej: Seguro GPS)" value={newDocTypeName} onChange={e=>setNewDocTypeName(e.target.value)} style={{minWidth:240}}/>
            <input className="in" type="number" value={newDocTypeWarn} onChange={e=>setNewDocTypeWarn(e.target.value)} style={{width:140}}/>
            <button className="bt" onClick={()=>{
              const slug=s=>(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");
              const name=(newDocTypeName||"").trim();
              const c=slug(name);
              if(!c||!name) return alert("Ingresa un nombre");
              if(docTypesCtrl.some(x=>x.c===c)) return alert("Ya existe ese código");
              setDocTypesCtrl(p=>[...p,{c,n:name,w:Number(newDocTypeWarn||30)}]);
              setNewDocTypeName(""); setNewDocTypeWarn(30);
            }}>Agregar</button>
          </div>
          <div style={{fontSize:9,color:"#64748B",marginTop:6}}>El código se genera automático desde el nombre.</div>
        </div>
  </div>
</div></div>}

{/* ═══ MODAL: Unidades (tractos / semis) ═══ */}

{/* ═══ MODAL: Unidades (tractos / semis) ═══ */}
{unitModal&&<div className="ov" onClick={()=>setUnitModal(false)}><div className="mo" onClick={e=>e.stopPropagation()}>
  <div style={{padding:"10px 14px",borderBottom:"1px solid #181E2A",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
    <div style={{fontWeight:800,color:"#E2E8F0"}}>⚙️ Gestión de Unidades</div>
    <button className="bt" onClick={()=>setUnitModal(false)}>Cerrar</button>
  </div>

  <div style={{padding:14,display:"flex",gap:8,flexWrap:"wrap"}}>
    <button className={`bt ${unitTab==="tractos"?"pr":""}`} onClick={()=>setUnitTab("tractos")}>🚛 Tractos</button>
    <button className={`bt ${unitTab==="semis"?"pr":""}`} onClick={()=>setUnitTab("semis")}>🛞 Semirremolques</button>
  </div>

  <div style={{padding:"0 14px 14px"}}>
    {unitTab==="tractos" ? (
      <div className="cd" style={{padding:10}}>
        <div style={{fontWeight:800,color:"#E2E8F0",marginBottom:8}}>Listado Tractos</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>
              <th style={{textAlign:"left",fontSize:9,color:"#3A4255",padding:"6px"}}>Placa</th>
              <th style={{textAlign:"left",fontSize:9,color:"#3A4255",padding:"6px"}}>Marca</th>
              <th style={{textAlign:"right",fontSize:9,color:"#3A4255",padding:"6px"}}>Acción</th>
            </tr></thead>
            <tbody>
              {unis.map(u=>(
                <tr key={u.id} style={{borderTop:"1px solid #1A1F2E"}}>
                  <td style={{padding:"6px"}}><input className="in" value={u.pl} onChange={e=>setUnis(p=>p.map(x=>x.id===u.id?{...x,pl:e.target.value}:x))}/></td>
                  <td style={{padding:"6px"}}><input className="in" value={u.mk||""} onChange={e=>setUnis(p=>p.map(x=>x.id===u.id?{...x,mk:e.target.value}:x))}/></td>
                  <td style={{padding:"6px",textAlign:"right"}}>
                    <button className="bt" onClick={()=>{
                      if(!confirm("¿Eliminar tracto?"))return;
                      const k=`T:${u.id}`;
                      setUnis(p=>p.filter(x=>x.id!==u.id));
                      setDocCtrl(prev=>{const out={...prev}; delete out[k]; return out;});
                    }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{marginTop:10,display:"flex",gap:8,flexWrap:"wrap"}}>
          <input className="in" placeholder="Placa" value={newTrPl} onChange={e=>setNewTrPl(e.target.value)} style={{width:140}}/>
          <input className="in" placeholder="Marca (VOLVO, INTL...)" value={newTrMk} onChange={e=>setNewTrMk(e.target.value)} style={{width:200}}/>
          <button className="bt pr" onClick={()=>{
            if(!newTrPl.trim()) return alert("Placa requerida");
            const id=Math.max(0,...unis.map(x=>x.id))+1;
            setUnis(p=>[...p,{id,pl:newTrPl.trim().toUpperCase(),mk:(newTrMk||"").trim()}]);
            setNewTrPl(""); setNewTrMk("");
          }}>Agregar</button>
        </div>
      </div>
    ) : (
      <div className="cd" style={{padding:10}}>
        <div style={{fontWeight:800,color:"#E2E8F0",marginBottom:8}}>Listado Semirremolques</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>
              <th style={{textAlign:"left",fontSize:9,color:"#3A4255",padding:"6px"}}>Placa</th>
              <th style={{textAlign:"left",fontSize:9,color:"#3A4255",padding:"6px"}}>Tipo</th>
              <th style={{textAlign:"right",fontSize:9,color:"#3A4255",padding:"6px"}}>Acción</th>
            </tr></thead>
            <tbody>
              {semis.map(s=>(
                <tr key={s.id} style={{borderTop:"1px solid #1A1F2E"}}>
                  <td style={{padding:"6px"}}><input className="in" value={s.pl} onChange={e=>setSemis(p=>p.map(x=>x.id===s.id?{...x,pl:e.target.value}:x))}/></td>
                  <td style={{padding:"6px"}}><input className="in" value={s.tipo||""} onChange={e=>setSemis(p=>p.map(x=>x.id===s.id?{...x,tipo:e.target.value}:x))}/></td>
                  <td style={{padding:"6px",textAlign:"right"}}>
                    <button className="bt" onClick={()=>{
                      if(!confirm("¿Eliminar semi?"))return;
                      const k=`S:${s.id}`;
                      setSemis(p=>p.filter(x=>x.id!==s.id));
                      setDocCtrl(prev=>{const out={...prev}; delete out[k]; return out;});
                    }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{marginTop:10,display:"flex",gap:8,flexWrap:"wrap"}}>
          <input className="in" placeholder="Placa" value={newSePl} onChange={e=>setNewSePl(e.target.value)} style={{width:140}}/>
          <input className="in" placeholder="Tipo (FURGON, TOLVA...)" value={newSeTipo} onChange={e=>setNewSeTipo(e.target.value)} style={{width:220}}/>
          <button className="bt pr" onClick={()=>{
            if(!newSePl.trim()) return alert("Placa requerida");
            const id=Math.max(0,...semis.map(x=>x.id))+1;
            setSemis(p=>[...p,{id,pl:newSePl.trim().toUpperCase(),tipo:(newSeTipo||"").trim()}]);
            setNewSePl(""); setNewSeTipo("");
          }}>Agregar</button>
        </div>
      </div>
    )}
  </div>
</div></div>}

{/* ═══ MODAL: Editar documento por unidad ═══ */}
{docEdit&&<div className="ov" onClick={()=>setDocEdit(null)}><div className="mo" onClick={e=>e.stopPropagation()} style={{maxWidth:520}}>
  <div style={{padding:"10px 14px",borderBottom:"1px solid #181E2A",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
    <div>
      <div style={{fontWeight:900,color:"#E2E8F0"}}>{docEdit.docType?.n||"Documento"}</div>
      <div style={{fontSize:10,color:"#64748B"}}>{docEdit.unitLabel||""}</div>
    </div>
    <button className="bt" onClick={()=>setDocEdit(null)}>Cerrar</button>
  </div>

  <div style={{padding:14,display:"grid",gap:10}}>
    <div className="cd" style={{padding:10,display:"grid",gap:8}}>
      <label style={{fontSize:10,color:"#64748B"}}>Fecha de vencimiento</label>
      <input className="in" type="date" value={docForm.venc} onChange={e=>setDocForm(f=>({...f,venc:e.target.value}))} />
      <label style={{fontSize:10,color:"#64748B"}}>Nro / Serie (opcional)</label>
      <input className="in" value={docForm.nro} onChange={e=>setDocForm(f=>({...f,nro:e.target.value}))} placeholder="Ej: 001-123456" />
      <label style={{fontSize:10,color:"#64748B"}}>Observación (opcional)</label>
      <textarea className="in" value={docForm.obs} onChange={e=>setDocForm(f=>({...f,obs:e.target.value}))} rows={3} placeholder="Notas rápidas..."/>
    </div>

    <div style={{display:"flex",gap:8,justifyContent:"flex-end",flexWrap:"wrap"}}>
      <button className="bt" onClick={()=>{
        if(!confirm("¿Quitar este documento?"))return;
        const {key,docType}=docEdit;
        setDocCtrl(prev=>{
          const out={...prev};
          const u={...(out[key]||{})};
          delete u[docType.c];
          out[key]=u;
          return out;
        });
        setDocEdit(null);
      }}>Quitar</button>
      <button className="bt pr" onClick={()=>{
        const {key,docType}=docEdit;
        setDocCtrl(prev=>{
          const out={...prev};
          const u={...(out[key]||{})};
          u[docType.c]={venc:docForm.venc,nro:(docForm.nro||"").trim(),obs:(docForm.obs||"").trim(),file:docForm.file||null};
          out[key]=u;
          return out;
        });
        setDocEdit(null);
      }}>Guardar</button>
    </div>
  </div>
</div></div>}


{/* Toast container */}
<div style={{position:"fixed",right:14,bottom:14,zIndex:9999,display:"grid",gap:8}}>
  {toasts.map(t=>(
    <div key={t.id} style={{minWidth:220,maxWidth:360,background:"#0B0F17",border:"1px solid #1A2333",color:"#E5E7EB",padding:"10px 12px",borderRadius:12,boxShadow:"0 10px 30px rgba(0,0,0,.35)",fontSize:12,fontWeight:700}}>
      {t.msg}
    </div>
  ))}
</div>


</div>);
}
