import React, { useEffect, useMemo, useState } from 'react';


const economicGroups = [
  'Militares, policiais e praças','Evangélicos','Agronegócio','Caminhoneiros','Católicos','MEI','Empresariado','Periferia','Classe média','Motoristas e entregadores de apps','Aposentados','Sindicalizados','Banqueiros','Trabalhadores com carteira','Mercado financeiro','Games','Internet','Servidores públicos','Mulheres','Profissionais da saúde','Agricultura familiar','Jovens','Professores','Ribeirinhos e quilombolas','Ciência','Terreiros e religiões de matriz africana','Ambientalistas','População LGBTQIA+','Povos indígenas','Universitários','Movimento negro','Artistas e cultura'
];
const initialPublicAssets = [
  {name:'Petrobras',value:420,unit:'R$ bi',sensitivity:'commodities'},
  {name:'Carteira de ações do BNDES',value:85,unit:'R$ bi',sensitivity:'market'},
  {name:'Portos e aeroportos federais',value:75,unit:'R$ bi',sensitivity:'investment'},
  {name:'Serpro e Dataprev',value:8,unit:'R$ bi',sensitivity:'technology'},
  {name:'Caixa Econômica Federal',value:105,unit:'R$ bi',sensitivity:'credit'},
  {name:'Eletrobras (participação federal remanescente — estimativa de jogo)',value:25,unit:'R$ bi',sensitivity:'energy'},
  {name:'Imóveis da União',value:120,unit:'R$ bi',sensitivity:'realestate'},
  {name:'Participações pequenas e ativos sem nomes',value:32,unit:'R$ bi',sensitivity:'market'},
  {name:'Banco do Brasil',value:95,unit:'R$ bi',sensitivity:'credit'},
  {name:'Caixa Seguridade',value:35,unit:'R$ bi',sensitivity:'market'},
  {name:'Correios',value:4,unit:'R$ bi',sensitivity:'operations'}
];

const states = [
  ['AC','Acre'],['AL','Alagoas'],['AP','Amapá'],['AM','Amazonas'],['BA','Bahia'],['CE','Ceará'],['DF','Distrito Federal'],['ES','Espírito Santo'],['GO','Goiás'],['MA','Maranhão'],['MT','Mato Grosso'],['MS','Mato Grosso do Sul'],['MG','Minas Gerais'],['PA','Pará'],['PB','Paraíba'],['PR','Paraná'],['PE','Pernambuco'],['PI','Piauí'],['RJ','Rio de Janeiro'],['RN','Rio Grande do Norte'],['RS','Rio Grande do Sul'],['RO','Rondônia'],['RR','Roraima'],['SC','Santa Catarina'],['SP','São Paulo'],['SE','Sergipe'],['TO','Tocantins']
];
const capitals = {'AC':'Rio Branco','AL':'Maceió','AP':'Macapá','AM':'Manaus','BA':'Salvador','CE':'Fortaleza','DF':'Brasília','ES':'Vitória','GO':'Goiânia','MA':'São Luís','MT':'Cuiabá','MS':'Campo Grande','MG':'Belo Horizonte','PA':'Belém','PB':'João Pessoa','PR':'Curitiba','PE':'Recife','PI':'Teresina','RJ':'Rio de Janeiro','RN':'Natal','RS':'Porto Alegre','RO':'Porto Velho','RR':'Boa Vista','SC':'Florianópolis','SP':'São Paulo','SE':'Aracaju','TO':'Palmas'};
const initialAllies = [
  {id:1,name:'Nikolas Ferreira',party:'PL',role:'Comunicação digital e mobilização',camp:'Direita',status:'Disponível',relation:38,conflict:['Érica Hilton']},
  {id:2,name:'Tarcísio de Freitas',party:'Republicanos',role:'Articulação com governos estaduais',camp:'Direita',status:'Possível aliado',relation:42,conflict:[]},
  {id:3,name:'Ratinho Júnior',party:'PSD',role:'Articulação regional e gestão',camp:'Centro-direita',status:'Possível aliado',relation:40,conflict:[]},
  {id:6,name:'Eduardo Leite',party:'PSD',role:'Diálogo regional e gestão pública',camp:'Centro',status:'Possível aliado',relation:39,conflict:[]},
  {id:7,name:'Geraldo Alckmin',party:'PSB',role:'Articulação de centro',camp:'Centro',status:'Possível aliado',relation:30,conflict:[]},
  {id:8,name:'Marina Silva',party:'REDE',role:'Meio ambiente e sustentabilidade',camp:'Centro-esquerda',status:'Possível aliada',relation:25,conflict:[]},
  {id:9,name:'Simone Tebet',party:'MDB',role:'Articulação e políticas públicas',camp:'Centro',status:'Possível aliada',relation:34,conflict:[]},
  {id:10,name:'Ciro Gomes',party:'PDT',role:'Programa econômico e debate',camp:'Centro-esquerda',status:'Possível aliado',relation:22,conflict:[]},
  {id:11,name:'Érica Hilton',party:'PSOL',role:'Direitos e articulação social',camp:'Esquerda',status:'Disponível',relation:40,conflict:['Lucas Pavanato','Nikolas Ferreira']},
  {id:12,name:'Lucas Pavanato',party:'PL',role:'Articulação e mobilização',camp:'Direita',status:'Disponível',relation:42,conflict:['Érica Hilton']},
  {id:13,name:'Erick Carvalho',party:'NOVO',role:'Estratégia e comunicação',camp:'Direita',status:'Disponível',relation:35,conflict:[]},
  {id:14,name:'Aldo Rebelo',party:'DC',role:'Articulação política',camp:'Centro',status:'Disponível',relation:32,conflict:[]},
  {id:15,name:'Augusto Cury',party:'Avante',role:'Educação e propostas sociais',camp:'Centro',status:'Possível aliado',relation:28,conflict:[]}
];
// Elenco de simulação: inclui nomes públicos citados pelo jogador e outros nomes cogitados.
// Não é uma lista oficial de candidaturas registradas; percentuais e resultados são fictícios.
const initialRivals = [
  {name:'Luiz Inácio Lula da Silva',party:'PT',color:'#e25d55',share:19.4,trend:0.2},
  {name:'Flávio Bolsonaro',party:'Republicanos',color:'#58a6ff',share:17.8,trend:-0.2},
  {name:'Romeu Zema',party:'NOVO',color:'#6bbf8b',share:10.4,trend:0.1},
  {name:'Ronaldo Caiado',party:'União Brasil',color:'#d8a64d',share:8.6,trend:0.1},
  {name:'Renan Santos',party:'Missão',color:'#e27a46',share:4.8,trend:0.0},
  {name:'Augusto Cury',party:'Avante',color:'#9b86d9',share:3.9,trend:0.0},
  {name:'Samara',party:'Candidatura independente',color:'#d477a8',share:2.3,trend:0.0},
  {name:'Aldo Rebelo',party:'DC',color:'#d6c56b',share:1.8,trend:0.0},
  {name:'Indecisos',party:'Ainda não decidiram',color:'#73808d',share:15.5,trend:-0.1}
];

const partyStartingShare = {
  'PL': 19.2, 'PT': 20.4, 'PSD': 10.8, 'MDB': 8.2, 'PSOL': 6.4,
  'PSB': 7.2, 'NOVO': 10.6, 'Republicanos': 8.8, 'União Brasil': 8.0,
  'PDT': 6.7, 'PP': 8.5, 'PSDB': 5.8, 'Avante': 3.8, 'Missão': 4.4,
  'Outro': 3.0
};
const partyStartingSupport = party => partyStartingShare[party] ?? 4.0;
const partyAffinity = (a, b) => {
  if (a === b) return 24;
  const groups = [ ['PL','Republicanos','PP'], ['PT','PSOL','PCdoB'], ['PSD','MDB','PSDB','União Brasil'], ['PSB','PDT','REDE'] ];
  return groups.some(g => g.includes(a) && g.includes(b)) ? 12 : 0;
};

const candidatePortraits = {
  'Luiz Inácio Lula da Silva': 'https://commons.wikimedia.org/wiki/Special:FilePath/Lula_-_foto_oficial_2023_%28cropped%29.jpg',
  'Flávio Bolsonaro': 'https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio_Bolsonaro_01.09.26_%28cropped_2%29.jpg',
  'Romeu Zema': 'https://commons.wikimedia.org/wiki/Special:FilePath/2026_ZEMA_CANDIDATO_PRESIDENTE_TSE_%28280002539826%29_%28cropped%29.jpg',
  'Ronaldo Caiado': 'https://commons.wikimedia.org/wiki/Special:FilePath/2026_RONALDO_CAIADO_CANDIDATO_PRESIDENTE_TSE_%28280002551932%29_%28cropped%29.jpg',
  'Renan Santos': 'https://commons.wikimedia.org/wiki/Special:FilePath/2026_RENAN_SANTOS_CANDIDATO_PRESIDENTE_TSE_%28280002540694%29_%28cropped%29.jpg',
  'Augusto Cury': 'https://commons.wikimedia.org/wiki/Special:FilePath/Augusto_Cury.jpg',
  'Geraldo Alckmin': 'https://commons.wikimedia.org/wiki/Special:FilePath/08.08.2026_-_FOTOS_OFICIAIS_-_55450293534.jpg',
  'Samara': 'https://commons.wikimedia.org/wiki/Special:FilePath/2026_SAMARA_CANDIDATA_PRESIDENTE_TSE_%28280002538811%29.JPG',
  'Samara Martins': 'https://commons.wikimedia.org/wiki/Special:FilePath/2026_SAMARA_CANDIDATA_PRESIDENTE_TSE_%28280002538811%29.JPG',
  'Aldo Rebelo': 'https://commons.wikimedia.org/wiki/Special:FilePath/Foto_oficial_de_Aldo_Rebelo.jpg'
};
function CandidateAvatar({name, color, userPhoto, userName, className='candidate-avatar'}) {
  const isUser = !!userName && name === userName;
  const src = isUser ? userPhoto : candidatePortraits[name];
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return <span className={className} style={{'--avatar':color||'#20c980',overflow:'hidden',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
    {src && !failed ? <img src={src} alt={`Foto de ${name}`} onError={()=>setFailed(true)} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/> : (name?.trim()?.charAt(0)?.toUpperCase()||'C')}
  </span>;
}

const celebrityGuests = [
  {name:'Gusttavo Lima',area:'Música sertaneja',cost:1.4,base:2},
  {name:'Ana Castela',area:'Música sertaneja',cost:1.1,base:2},
  {name:'Pablo Marçal',area:'Empreendedorismo e redes',cost:1.0,base:1},
  {name:'Felca',area:'Humor e internet',cost:0.7,base:0},
  {name:'Felipe Neto',area:'Criador de conteúdo',cost:0.8,base:0},
  {name:'Neymar Jr.',area:'Futebol',cost:2.0,base:2},
  {name:'Rayssa Leal',area:'Skate e esporte',cost:0.8,base:1},
  {name:'Whindersson Nunes',area:'Humor e internet',cost:0.9,base:1},
  {name:'Virginia Fonseca',area:'Influência digital e entretenimento',cost:1.2,base:1}
];
const partyColors = {'PL':'#2563eb','PT':'#d94343','PSD':'#8b5cf6','MDB':'#22a06b','PSOL':'#e34a8c','PSB':'#ef8b8b','NOVO':'#f59e0b','Republicanos':'#e7b84b','União Brasil':'#1d9ac4','PDT':'#e65c37','PP':'#3b82a0','PSDB':'#e0c341','Missão':'#e27a46','Avante':'#9b86d9','DC':'#d6c56b','Candidatura independente':'#7f8c8d','Outro':'#20c980'};
const governmentMinistries = [
  {id:'Casa Civil',title:'Casa Civil',desc:'Coordena a articulação política e monitora a execução dos programas do governo.',skills:['articulação','gestão','governo','política']},
  {id:'Fazenda',title:'Ministério da Fazenda',desc:'Política econômica, impostos, orçamento e controle da inflação.',skills:['economia','fazenda','econômico','gestão']},
  {id:'Educação',title:'Ministério da Educação (MEC)',desc:'Política nacional de educação, do ensino básico ao superior.',skills:['educação','professor','pesquisa','social']},
  {id:'Saúde',title:'Ministério da Saúde',desc:'SUS, prevenção e políticas de saúde pública.',skills:['saúde','médico','gestão','social']},
  {id:'Justiça',title:'Ministério da Justiça e Segurança Pública',desc:'Segurança pública, combate ao crime e política de justiça.',skills:['justiça','segurança','polícia','direito']},
  {id:'Defesa',title:'Ministério da Defesa',desc:'Coordena Marinha, Exército e Aeronáutica.',skills:['defesa','militar','segurança']},
  {id:'Minas e Energia',title:'Ministério de Minas e Energia',desc:'Energia, petróleo, gás e mineração.',skills:['energia','infraestrutura','economia']},
  {id:'Meio Ambiente',title:'Ministério do Meio Ambiente e Mudança do Clima',desc:'Preservação ambiental e combate ao desmatamento.',skills:['ambiente','ambiental','sustentabilidade']},
  {id:'Transportes',title:'Ministério dos Transportes / Portos e Aeroportos',desc:'Rodovias, ferrovias, hidrovias, portos e aeroportos.',skills:['transporte','infraestrutura','gestão']},
  {id:'Agricultura',title:'Ministério da Agricultura e Pecuária',desc:'Desenvolvimento da agropecuária e do agronegócio.',skills:['agricultura','agro','pecuária']}
];
const knownGovernors = [
  {name:'Tarcísio de Freitas',party:'Republicanos',role:'Infraestrutura e gestão estadual'}, {name:'Eduardo Leite',party:'PSD',role:'Gestão pública'},
  {name:'Ratinho Júnior',party:'PSD',role:'Gestão estadual e infraestrutura'}, {name:'Romeu Zema',party:'NOVO',role:'Gestão e economia'},
  {name:'Ronaldo Caiado',party:'União Brasil',role:'Agricultura e segurança'}, {name:'Jerônimo Rodrigues',party:'PT',role:'Educação e gestão pública'},
  {name:'Cláudio Castro',party:'PL',role:'Segurança pública'}, {name:'Fátima Bezerra',party:'PT',role:'Educação'},
  {name:'Helder Barbalho',party:'MDB',role:'Gestão pública'}, {name:'Raquel Lyra',party:'PSD',role:'Gestão pública'},
  {name:'Renato Casagrande',party:'PSB',role:'Gestão e meio ambiente'}, {name:'Carlos Brandão',party:'PSB',role:'Gestão pública'},
  {name:'Jorginho Mello',party:'PL',role:'Gestão estadual e articulação política'}, {name:'Eduardo Riedel',party:'PP',role:'Gestão pública e agronegócio'},
  {name:'Wanderlei Barbosa',party:'Republicanos',role:'Gestão estadual'}, {name:'Gladson Cameli',party:'PP',role:'Gestão estadual e infraestrutura'},
  {name:'Wilson Lima',party:'União Brasil',role:'Gestão estadual e segurança'}, {name:'Antônio Denarium',party:'PP',role:'Gestão estadual e agronegócio'},
  {name:'Marcos Rocha',party:'União Brasil',role:'Segurança pública e gestão estadual'}, {name:'Fábio Mitidieri',party:'PSD',role:'Gestão pública e desenvolvimento econômico'},
  {name:'Elmano de Freitas',party:'PT',role:'Gestão pública e políticas sociais'}, {name:'Paulo Dantas',party:'MDB',role:'Gestão estadual'},
  {name:'Cleitinho',party:'Republicanos',role:'Política estadual e representação de Minas Gerais'},
  {name:'Sergio Moro',party:'União Brasil',role:'Direito, Justiça e segurança pública'}
];
// Banco ampliado para a formação ministerial. Perfis explicitamente fictícios são arquétipos de simulação, não pessoas reais.
const expandedMinisterPool = [
  {name:'Sergio Moro',party:'União Brasil',role:'Direito, Justiça e segurança pública'},
  {name:'Cleitinho',party:'Republicanos',role:'Política estadual e representação de Minas Gerais'},
  {name:'Jorginho Mello',party:'PL',role:'Gestão estadual e articulação política'},
  {name:'Eduardo Riedel',party:'PP',role:'Gestão pública e agronegócio'},
  {name:'Wanderlei Barbosa',party:'Republicanos',role:'Gestão estadual'},
  {name:'Gladson Cameli',party:'PP',role:'Gestão estadual e infraestrutura'},
  {name:'Wilson Lima',party:'União Brasil',role:'Gestão estadual e segurança'},
  {name:'Antônio Denarium',party:'PP',role:'Gestão estadual e agronegócio'},
  {name:'Marcos Rocha',party:'União Brasil',role:'Segurança pública e gestão estadual'},
  {name:'Fábio Mitidieri',party:'PSD',role:'Gestão pública e desenvolvimento econômico'},
  {name:'Elmano de Freitas',party:'PT',role:'Gestão pública e políticas sociais'},
  {name:'Carlos Brandão',party:'PSB',role:'Gestão pública e articulação política'},
  {name:'Paulo Dantas',party:'MDB',role:'Gestão estadual'},
  {name:'Fábio Trad',party:'PSD',role:'Direito e articulação política'},
  {name:'Fernando Haddad',party:'PT',role:'Economia, orçamento e Fazenda'},
  {name:'Henrique Meirelles',party:'PSD',role:'Economia, mercado financeiro e Banco Central'},
  {name:'Roberto Campos Neto',party:'Independente',role:'Economia, política monetária e Banco Central'},
  {name:'Ilan Goldfajn',party:'Independente',role:'Economia, finanças e Banco Central'},
  {name:'Tereza Cristina',party:'PP',role:'Agricultura, agropecuária e relações internacionais'},
  {name:'Marcos Pontes',party:'PL',role:'Ciência, tecnologia e experiência aeronáutica'},
  {name:'Braga Netto',party:'PL',role:'Defesa e experiência militar'},
  {name:'Santos Cruz',party:'Podemos',role:'Defesa, Exército e gestão pública'},
  {name:'Almir Garnier Santos',party:'Independente',role:'Marinha e defesa nacional'},
  {name:'Carlos de Almeida Baptista Júnior',party:'Independente',role:'Aeronáutica e defesa nacional'},
  {name:'Raul Jungmann',party:'Cidadania',role:'Defesa, segurança pública e gestão'},
  {name:'Andrei Rodrigues',party:'Independente',role:'Polícia Federal, investigação e segurança pública'},
  {name:'Ex-comandante de Polícia Militar (perfil fictício)',party:'Independente',role:'Polícia, segurança pública e comando operacional'},
  {name:'Ex-delegada-geral de Polícia Civil (perfil fictício)',party:'Independente',role:'Polícia, investigação e gestão de segurança'},
  {name:'Almirante da reserva (perfil fictício)',party:'Independente',role:'Marinha, defesa e logística'},
  {name:'Brigadeiro da reserva (perfil fictício)',party:'Independente',role:'Aeronáutica, aviação e defesa'},
  {name:'General da reserva (perfil fictício)',party:'Independente',role:'Exército, defesa e planejamento estratégico'},
  {name:'Dra. Ana Ribeiro — médica sanitarista (perfil fictício)',party:'Independente',role:'Médica, saúde pública, SUS e gestão hospitalar'},
  {name:'Dr. Marcelo Nogueira — ex-diretor hospitalar (perfil fictício)',party:'Independente',role:'Medicina, gestão hospitalar e saúde pública'},
  {name:'Ex-diretor do Hospital Israelita Albert Einstein (perfil fictício)',party:'Independente',role:'Gestão hospitalar, medicina e inovação em saúde'},
  {name:'Economista-chefe de banco público (perfil fictício)',party:'Independente',role:'Economia, orçamento e finanças públicas'},
  {name:'Ex-presidente da Caixa (perfil fictício)',party:'Independente',role:'Banco público, crédito, habitação e gestão financeira'},
  {name:'Ex-diretor do Banco Central (perfil fictício)',party:'Independente',role:'Banco Central, economia, regulação e política monetária'},
  {name:'Engenheira de infraestrutura (perfil fictício)',party:'Independente',role:'Engenharia, transportes e infraestrutura'},
  {name:'Pesquisador de energia e petróleo (perfil fictício)',party:'Independente',role:'Energia, petróleo, mineração e pesquisa'},
  {name:'Pesquisadora ambiental (perfil fictício)',party:'Independente',role:'Meio ambiente, sustentabilidade e clima'},
  {name:'Especialista em educação básica (perfil fictício)',party:'Independente',role:'Educação, professorado e políticas públicas'},
  {name:'Liderança do agronegócio (perfil fictício)',party:'Independente',role:'Agricultura, agronegócio e pecuária'},
  {name:'Executiva de tecnologia (perfil fictício)',party:'Independente',role:'Tecnologia, inovação, ciência e transformação digital'},
  {name:'Gusttavo Lima',party:'Independente',role:'Música, comunicação pública e mobilização popular'},
  {name:'Ana Castela',party:'Independente',role:'Cultura, música e comunicação pública'},
  {name:'Virginia Fonseca',party:'Independente',role:'Comunicação digital, marketing e influência pública'},
  {name:'Neymar Jr.',party:'Independente',role:'Esporte, projetos sociais e comunicação pública'},
  {name:'Felipe Neto',party:'Independente',role:'Comunicação digital e mobilização social'},
  {name:'Whindersson Nunes',party:'Independente',role:'Comunicação, cultura e projetos sociais'},
  {name:'Rayssa Leal',party:'Independente',role:'Esporte, juventude e projetos sociais'}
];

const tabs = [
  ['palco','◉','Palanque'],['mapa','◇','Mapa'],['equipe','♙','Equipe'],['pesquisas','％','Pesquisas'],['debates','◉','Debates'],['redes','#','Redes']
];
function Icon({children}) { return <span className="icon">{children}</span> }
function App(){
  const [activeAccount,setActiveAccount]=useState('');
  const [accountReady,setAccountReady]=useState(false);
  const [authMode,setAuthMode]=useState('register');
  const [authEmail,setAuthEmail]=useState('');
  const [authPassword,setAuthPassword]=useState('');
  const [authError,setAuthError]=useState('');
  const [tab,setTab]=useState('palco');
  const [week,setWeek]=useState(1);
  const [actions,setActions]=useState(0);
  const [energy,setEnergy]=useState(76);
  const [cash,setCash]=useState(137.7);
  const [security,setSecurity]=useState(60);
  const [candidate,setCandidate]=useState('');
  const [fullName,setFullName]=useState('');
  const [age,setAge]=useState('');
  const [photo,setPhoto]=useState('');
  const [created,setCreated]=useState(false);
  const [vice,setVice]=useState('');
  const [minister,setMinister]=useState('');
  const [party,setParty]=useState('PL');
  const [allyList,setAllyList]=useState(initialAllies);
  const [chosen,setChosen]=useState([]);
  const [statePick,setStatePick]=useState('SP');
  const [log,setLog]=useState([{type:'Início',title:'A pré-campanha começa',body:'Sua equipe ainda está sendo formada. As primeiras decisões vão definir o rumo da campanha.' }]);
  const [post,setPost]=useState('');
  const [postResult,setPostResult]=useState('');
  const [socialReactions,setSocialReactions]=useState([]);
  const [selectedCelebrity,setSelectedCelebrity]=useState('');
  const [celebrityMeetingResult,setCelebrityMeetingResult]=useState('');
  const [researchState,setResearchState]=useState('Brasil');
  const [modal,setModal]=useState('');
  const [headline,setHeadline]=useState('Governador sobe no palanque');
  const [message,setMessage]=useState('');
  const [polls,setPolls]=useState(initialRivals);
  const [selectedAction,setSelectedAction]=useState('Caminhada');
  const [lastAction,setLastAction]=useState('Caminhada no Rio de Janeiro');
  const [mapFocus,setMapFocus]=useState('RJ');
  const [stateCampaignEffects,setStateCampaignEffects]=useState({});
  const [president,setPresident]=useState('');
  const [cabinet,setCabinet]=useState([]);
  const [ministerChoices,setMinisterChoices]=useState({});
  const [mandateStarted,setMandateStarted]=useState(false);
  const [cabinetFeedback,setCabinetFeedback]=useState('');
  const [mandateMonth,setMandateMonth]=useState(1);
  const [mandateTrend,setMandateTrend]=useState({approval:[],gdp:[],unemployment:[],inflation:[],primary:[],debt:[],gas:[],selic:[],dollar:[],risk:[],credibility:[],productivity:[],confidence:[],infantMortality:[],femicide:[],homicides:[],idh:[],poverty:[],sewage:[],life:[]});
  const [mandateNewspaper,setMandateNewspaper]=useState(null);
  const [mandateVote,setMandateVote]=useState(null);
  const [policyEvaluationLoading,setPolicyEvaluationLoading]=useState(false);
  const [policyEvaluationError,setPolicyEvaluationError]=useState('');
  const [mandateTab,setMandateTab]=useState('painel');
  const [nationSubtab,setNationSubtab]=useState('PANORAMA');
  const [selectedIndicators,setSelectedIndicators]=useState(['Crescimento do PIB','Desemprego','Inflação','Resultado primário','Dívida bruta','Gasolina']);
  const [policyDraft,setPolicyDraft]=useState('');
  const [mandateMetrics,setMandateMetrics]=useState({approval:58.5,gdp:2.2,unemployment:6.2,inflation:4.5,primary:-70,debt:79,gas:6.10,selic:12.25,dollar:5.42,risk:210,credibility:56,productivity:51,confidence:54,infantMortality:12.6,femicide:3.8,homicides:19.0,idh:0.76,poverty:28.3,sewage:56,life:75.5});
  const [economyHistory,setEconomyHistory]=useState([]);
  const [economyAssets,setEconomyAssets]=useState(initialPublicAssets);
  const [economyGroupSentiment,setEconomyGroupSentiment]=useState(()=>Object.fromEntries(economicGroups.map((name,i)=>[name,Math.max(38,Math.min(68,52+((i*7)%13)-6))])));
  const [economyEvents,setEconomyEvents]=useState([]);
  const [mandateAgenda,setMandateAgenda]=useState([{month:1,title:'Organizar a equipe ministerial',status:'Concluída'}]);
  const [mandateCrises,setMandateCrises]=useState([{title:'Transição de governo',severity:'Baixa',body:'A equipe inicia a organização dos primeiros 100 dias.'}]);
  const [debate,setDebate]=useState(false);
  const [campaignStarted,setCampaignStarted]=useState(false);
  const [playerShare,setPlayerShare]=useState(10.5);
  const [activeEvent,setActiveEvent]=useState(null);
  const [electionResult,setElectionResult]=useState(null);
  const [pollInstitute,setPollInstitute]=useState('Quaest');
  const [pollSnapshots,setPollSnapshots]=useState({});
  const [pendingAlly,setPendingAlly]=useState(null);
  const [inviteProposal,setInviteProposal]=useState('');
  const [pendingPollImpact,setPendingPollImpact]=useState(0);
  const [debateAnswer,setDebateAnswer]=useState('');
  const [debateQuestion,setDebateQuestion]=useState(null);
  const [debateStage,setDebateStage]=useState(0);
  const [debateScore,setDebateScore]=useState(0);
  const [debateDoneWeek,setDebateDoneWeek]=useState(null);
  const [secondRoundWeeksRemaining,setSecondRoundWeeksRemaining]=useState(0);
  const playerWonElection = !!(electionResult && ((electionResult.secondRoundDone && electionResult.secondRoundResult?.[0]?.name===candidate) || (!electionResult.secondRound && electionResult.firstRound?.[0]?.name===candidate)));
  useEffect(()=>{ if(playerWonElection) setTab('mandato'); },[playerWonElection]);
  const ministerCandidates = useMemo(()=>{
    const people=[...initialAllies,...initialRivals.map(p=>({name:p.name,party:p.name==='Flávio Bolsonaro'?'Republicanos':p.party,role:p.name==='Augusto Cury'?'Educação e políticas sociais':p.name==='Aldo Rebelo'?'Articulação política':p.name==='Luiz Inácio Lula da Silva'?'Experiência de governo':p.name==='Flávio Bolsonaro'?'Articulação política':'Atuação pública'})),...knownGovernors,...expandedMinisterPool,{name:'Flávio Bolsonaro',party:'Republicanos',role:'Articulação política e atuação legislativa'},{name:candidate,party,role:'Presidente eleito'}, {name:vice,party:initialAllies.find(a=>a.name===vice)?.party||party,role:'Vice-presidente'}].filter(p=>p.name && p.name!=='Indecisos');
    return people.filter((p,i,arr)=>arr.findIndex(q=>q.name===p.name)===i).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
  },[candidate,party,vice]);
  function ministerFit(person, ministry){
    const text=((person.role||'')+' '+person.name+' '+(person.party||'')).toLowerCase();
    const matches=ministry.skills.filter(k=>text.includes(k)).length;
    if(person.name===candidate||person.name===vice) return ministry.id==='Casa Civil'?2:0;
    return matches?Math.min(3,matches+1):0;
  }
  function swearInCabinet(){
    const missing=governmentMinistries.filter(m=>!ministerChoices[m.id]);
    if(missing.length){setCabinetFeedback('Escolha uma pessoa para cada uma das 10 pastas antes de dar posse.');return;}
    let mismatch=0;
    const names=[];
    governmentMinistries.forEach(m=>{const person=ministerCandidates.find(p=>p.name===ministerChoices[m.id]);const fit=person?ministerFit(person,m):0;if(fit===0)mismatch++;names.push({ministry:m.id,name:ministerChoices[m.id],party:person?.party||'Independente',fit});});
    setCabinet(names);setMandateStarted(true);setTab('mandato');setModal('');
    if(mismatch){setSecurity(v=>Math.max(0,v-mismatch*3));setPlayerShare(v=>Math.max(1,v-mismatch*0.45));setCabinetFeedback(`Governo empossado. ${mismatch} nome(s) foram considerados pouco compatíveis com a pasta; a rejeição subiu e a aprovação inicial caiu.`);addLog('Primeiro gabinete empossado',`O governo tomou posse com ${mismatch} escolha(s) questionadas pela adequação técnica.`);}
    else {setSecurity(v=>Math.min(100,v+3));setCabinetFeedback('Governo empossado. As escolhas demonstram compatibilidade geral com as funções; a confiança inicial melhorou.');addLog('Primeiro gabinete empossado','O governo tomou posse com uma equipe considerada compatível com as pastas.');}
  }
  const mandateIndicatorLabels = {
    'Aprovação':'approval','Crescimento do PIB':'gdp','Desemprego':'unemployment','Inflação':'inflation','Resultado primário':'primary','Dívida bruta':'debt','Gasolina':'gas','Selic':'selic','Dólar':'dollar','Risco país':'risk','Credibilidade':'credibility','Produtividade':'productivity','Confiança':'confidence','Mortalidade infantil':'infantMortality','Feminicídio':'femicide','Homicídios':'homicides','IDH':'idh','Pobreza':'poverty','Esgoto coletado':'sewage','Expectativa de vida':'life'
  };
  // Avaliador local de políticas públicas: heurístico e explicável, sem API externa ou chave de IA.
  // Avalia mérito, riscos legais/éticos, impacto ambiental, custo e clareza antes da votação simulada.
  function evaluatePolicy(text){
    const t=(text||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const has=(...words)=>words.some(w=>t.includes(w));
    const findings=[]; let score=55; let risk='Moderado'; let recommendation='Revisar detalhes';
    const animalHarm=has('matar veado','matar veados','abater veado','abater veados','matar animais silvestres','abater animais silvestres','caçar veado','cacar veado','exterminar veados','matar capivara','matar capivaras');
    const wildlife=animalHarm||has('fauna','animais silvestres','biodiversidade','espécies ameaçadas','especies ameacadas','caça','caca','abate de animais');
    const rightsRisk=has('perseguir','expulsar grupo','discriminar','censura','tortura','execução sem julgamento','execucao sem julgamento');
    const environment=has('desmatamento','poluição','poluicao','queimar floresta','contaminar rio','agrotóxico sem controle','agrotoxico sem controle');
    const publicBenefit=has('saúde','saude','educação','educacao','saneamento','emprego','habitação','habitacao','prevenção','prevencao','pesquisa','conservação','conservacao','reflorestamento');
    const concrete=has('orçamento','orcamento','prazo','meta','fiscalização','fiscalizacao','estudo de impacto','consulta pública','consulta publica','licença','licenca','monitoramento','evidência','evidencia','financiar','financiamento');
    const costRisk=has('gasto sem fonte','sem orçamento','sem orcamento','gasto ilimitado','imposto zero para todos');
    if(text.trim().length<35){score-=12;findings.push('A proposta está curta e não explica bem como será executada.');}
    else {score+=5;findings.push('A proposta tem conteúdo suficiente para uma primeira triagem.');}
    if(publicBenefit){score+=10;findings.push('Há um objetivo público identificável.');}
    if(concrete){score+=12;findings.push('Inclui elementos de execução, controle ou financiamento.');}
    else findings.push('Faltam metas, custos, fiscalização ou critérios de sucesso verificáveis.');
    if(wildlife){score-=25;risk='Alto';findings.push('Risco ambiental e de bem-estar animal: a proposta envolve fauna silvestre e precisa justificar necessidade, base legal, avaliação ecológica e alternativas não letais.');}
    if(animalHarm){score-=18;findings.push('Recomendação específica: não aprovar um abate indiscriminado. Exigir parecer de órgão ambiental, identificação da espécie, evidências de risco, autorização legal e plano de manejo; priorizar prevenção e métodos não letais.');}
    if(environment){score-=20;risk='Alto';findings.push('Pode causar dano ambiental relevante; exige avaliação de impacto e medidas de mitigação.');}
    if(rightsRisk){score-=35;risk='Crítico';findings.push('Há possível violação de direitos fundamentais ou de garantias legais; a proposta precisa ser barrada ou reformulada.');}
    if(costRisk){score-=15;findings.push('Risco fiscal: não há fonte de financiamento ou limite de despesa claro.');}
    score=Math.max(0,Math.min(100,score));
    if(risk!=='Crítico'&&score>=72)recommendation='Favorável, com monitoramento';
    else if(risk==='Crítico'||score<35)recommendation='Desfavorável — reformular';
    else recommendation='Revisar e exigir salvaguardas';
    return {score,risk,recommendation,findings,animalHarm,wildlife,rightsRisk,environment,costRisk};
  }
  function closeMandateMonth(votePassed=true){
    const text=policyDraft.trim();
    const next={...mandateMetrics};
    const t=text.toLowerCase();
    const has=(...words)=>words.some(w=>t.includes(w));
    let impact=0;
    const policyReview=evaluatePolicy(text);
    // Medida aprovada que propõe abate de fauna silvestre gera custos ambientais, jurídicos e reputacionais.
    if(text && votePassed && policyReview.animalHarm){
      next.approval-=2.2; next.confidence-=3.5; next.credibility-=4.5; next.risk+=8; impact-=3.2;
      setMandateCrises(old=>[{title:'Controvérsia ambiental: proposta de abate de veados',severity:'Alta',body:'A medida aprovada foi sinalizada pelo avaliador por riscos à fauna e ao bem-estar animal. O governo precisa publicar a justificativa técnica, consultar os órgãos ambientais e avaliar alternativas não letais; a aprovação política não elimina possíveis exigências legais.'},...old].slice(0,5));
    } else if(text && votePassed && policyReview.wildlife){
      next.confidence-=1.0; next.credibility-=1.0; impact-=0.8;
    }
    // Resultados simulados com efeitos claros e acumulados: propostas aprovadas não resolvem tudo instantaneamente. Os mesmos textos geram os mesmos efeitos iniciais; a evolução posterior depende dos indicadores acumulados.
    if(text && votePassed){
      if(has('emprego','indústria','infraestrutura','obras','investimento produtivo','construir')){next.gdp=Math.min(8,next.gdp+0.35);next.unemployment=Math.max(2,next.unemployment-0.22);next.productivity=Math.min(100,next.productivity+1.1);next.confidence=Math.min(95,next.confidence+1.2);impact+=2.0;}
      if(has('imposto','gasto','orçamento','corte de gastos','arrecadação','responsabilidade fiscal','dívida')){next.primary=Math.min(150,next.primary+8);next.debt=Math.max(35,next.debt-0.35);next.risk=Math.max(50,next.risk-6);next.credibility=Math.min(95,next.credibility+1.5);impact+=1.2;}
      // Cada área tem efeitos próprios. São mudanças graduais e acumulativas do simulador.
      if(has('saúde','sus','hospital','vacina','atenção básica','médico','ubs','saneamento básico')){next.infantMortality=Math.max(2,next.infantMortality-0.35);next.life=Math.min(90,next.life+0.12);next.confidence=Math.min(95,next.confidence+1.1);next.approval+=0.25;impact+=1.4;}
      if(has('segurança','polícia','homicídio','feminicídio','investigação','policiamento','crime','facção')){next.homicides=Math.max(3,next.homicides-0.55);next.femicide=Math.max(0.5,next.femicide-0.12);impact+=1.1;}
      if(has('esgoto','saneamento','água tratada','água potável')){next.sewage=Math.min(100,next.sewage+1.25);next.life=Math.min(90,next.life+0.07);next.infantMortality=Math.max(2,next.infantMortality-0.08);impact+=0.8;}
      if(has('pobreza','bolsa','renda','transferência de renda','assistência social','salário mínimo')){next.poverty=Math.max(3,next.poverty-0.55);next.confidence=Math.min(95,next.confidence+0.7);impact+=0.9;}
      if(has('educação','escola','professor','alfabetização','creche','universidade','ensino técnico')){next.confidence=Math.min(95,next.confidence+0.6);next.productivity=Math.min(100,next.productivity+0.45);next.idh=Math.min(0.9,next.idh+0.0012);impact+=0.8;}
      if(has('meio ambiente','ambiental','desmatamento','reflorestamento','energia limpa','preservação')){next.productivity=Math.min(100,next.productivity+0.15);next.confidence=Math.min(95,next.confidence+0.25);impact+=0.35;}
      if(has('emprego','qualificação','curso profissionalizante','aprendizagem')){next.unemployment=Math.max(2,next.unemployment-0.3);next.poverty=Math.max(3,next.poverty-0.18);next.productivity=Math.min(100,next.productivity+0.45);impact+=0.8;}
      if(has('exportação','comércio exterior','acordo comercial','diplomacia','investimento estrangeiro')){next.confidence=Math.min(95,next.confidence+0.45);next.dollar=Math.max(2,next.dollar-0.06);next.gdp=Math.min(8,next.gdp+0.12);impact+=0.35;}
      if(has('reduzir selic','baixar juros')){next.selic=Math.max(2,next.selic-0.3);next.confidence=Math.max(0,Math.min(95,next.confidence-0.15));impact+=0.3;}
      if(has('gasolina','combustível','petróleo')){next.gas=Math.max(3,next.gas-0.12);next.inflation=Math.max(1,next.inflation-0.08);impact+=0.4;}
      if(has('censura','perseguir','interferir no banco central','sem licitação','corrupção')){next.credibility=Math.max(5,next.credibility-7);next.confidence=Math.max(5,next.confidence-5);next.risk=Math.min(600,next.risk+18);impact-=3.0;}
      if(has('subsídio','gasto sem fonte','aumentar gasto')){next.primary-=12;next.debt=Math.min(100,next.debt+0.7);next.risk=Math.min(600,next.risk+10);impact-=1.2;}
      const vague=text.length<18||!has('lei','programa','plano','criar','ampliar','reduzir','aumentar','investir','construir','reformar','garantir','implementar','aprovar','cortar','taxar','desonerar','regulamentar','financiar','fortalecer','expandir','combater','modernizar','instituir','destinar');
      next.approval+=Math.max(-4,Math.min(4,impact+(vague?-1.6:0)+(((text.length % 7)-3)*0.04)));
      next.confidence+=impact*0.35+(vague?-1:0);
      next.credibility+=impact*0.25+(vague?-1.2:0);
    } else {
      next.approval-=text?-1.4:2.4; next.confidence-=1.3; next.credibility-=text?0.8:1.4;
      next.risk+=3; if(text) next.primary-=3;
    }
    // Efeitos indiretos previsíveis: sem uma política relacionada, não há salto aleatório nos indicadores.
    // O ciclo representa pressões macroeconômicas pequenas e repetíveis da simulação.
    const cycle=((mandateMonth%4)-1.5);
    next.inflation+=next.gas>7?0.04:next.gas<5?-0.025:0.005;
    next.selic+=next.inflation>6?0.12:next.inflation<3.5?-0.06:0;
    next.dollar+=next.risk>300?0.05:next.credibility>70?-0.025:0.005;
    next.gas+=next.dollar>6?0.025:next.dollar<4?-0.015:0;
    next.gdp+=(next.confidence-50)*0.004+(next.productivity-50)*0.002+cycle*0.008;
    next.unemployment+=(2.5-next.gdp)*0.018;
    next.debt+=next.primary<0?Math.min(0.22,Math.abs(next.primary)*0.0015):-0.035;
    next.primary+=(next.gdp-2)*0.35-(next.unemployment-6)*0.12;
    next.risk+=next.credibility<45?2.5:next.credibility>65?-1.5:0;
    next.productivity+=(next.gdp>3?0.08:next.gdp<0?-0.06:0);
    next.infantMortality+=next.sewage<60?0.025:-0.01;
    next.femicide+=next.confidence<35?0.025:-0.005;
    next.homicides+=next.unemployment>10?0.06:-0.015;
    next.idh=Math.min(0.9,next.idh+(next.life>76&&next.poverty<25?0.0004:0));
    next.poverty+=(next.unemployment>8?0.08:next.unemployment<5?-0.04:0);
    next.sewage+=next.primary>0?0.015:0;
    next.life=Math.min(90,next.life+(next.infantMortality<10?0.008:0));
    for(const k of Object.keys(next)){
      if(['approval','confidence','credibility','productivity','sewage'].includes(k))next[k]=Math.max(0,Math.min(100,next[k]));
      else if(k==='inflation')next[k]=Math.max(1,Math.min(20,next[k]));
      else if(k==='selic')next[k]=Math.max(2,Math.min(25,next[k]));
      else if(k==='dollar')next[k]=Math.max(2,Math.min(10,next[k]));
      else if(k==='gas')next[k]=Math.max(3,Math.min(12,next[k]));
      else if(k==='risk')next[k]=Math.max(50,Math.min(600,next[k]));
      else if(k==='debt')next[k]=Math.max(35,Math.min(120,next[k]));
      else if(k==='gdp')next[k]=Math.max(-5,Math.min(8,next[k]));
      else if(k==='unemployment')next[k]=Math.max(2,Math.min(25,next[k]));
      else if(k==='primary')next[k]=Math.max(-250,Math.min(150,next[k]));
      else if(k==='infantMortality')next[k]=Math.max(2,Math.min(40,next[k]));
      else if(k==='femicide')next[k]=Math.max(0.5,Math.min(10,next[k]));
      else if(k==='homicides')next[k]=Math.max(3,Math.min(60,next[k]));
      else if(k==='idh')next[k]=Math.max(0.5,Math.min(0.9,next[k]));
      else if(k==='poverty')next[k]=Math.max(3,Math.min(70,next[k]));
      else if(k==='life')next[k]=Math.max(60,Math.min(90,next[k]));
    }
    setMandateTrend(old=>Object.fromEntries(Object.keys(next).map(k=>[k,[...(old[k]||[]),next[k]-(mandateMetrics[k]||0)].slice(-6)])));
    // Motor econômico: os indicadores reagem às mudanças efetivamente calculadas para o mês.
    const approvedText = text && votePassed;
    const fiscalDelta = next.primary - mandateMetrics.primary;
    const growthDelta = next.gdp - mandateMetrics.gdp;
    const confidenceDelta = next.confidence - mandateMetrics.confidence;
    const credibilityDelta = next.credibility - mandateMetrics.credibility;
    const newEconomicAssets = economyAssets.map(asset => {
      let pct = confidenceDelta * 0.0015 + credibilityDelta * 0.0008;
      if (asset.sensitivity === 'commodities') pct += (has('petróleo','exportação','mineração','commodities') ? 0.012 : 0) + (next.dollar-mandateMetrics.dollar)*0.003;
      if (asset.sensitivity === 'market') pct += (next.risk < mandateMetrics.risk ? 0.008 : next.risk > mandateMetrics.risk ? -0.008 : 0) + confidenceDelta*0.001;
      if (asset.sensitivity === 'investment') pct += (has('infraestrutura','porto','aeroporto','concessão','investimento') ? 0.012 : 0) + growthDelta*0.002;
      if (asset.sensitivity === 'technology') pct += has('tecnologia','digital','inovação','serpro','dataprev') ? 0.015 : 0;
      if (asset.sensitivity === 'credit') pct += growthDelta*0.003 + (next.selic < mandateMetrics.selic ? 0.004 : 0);
      if (asset.sensitivity === 'energy') pct += has('energia','eletricidade','eletrobras') ? 0.012 : 0;
      if (asset.sensitivity === 'realestate') pct += has('imóveis','regularização fundiária','venda de imóveis') ? 0.008 : 0;
      if (asset.sensitivity === 'operations') pct += has('correios','logística','modernização','eficiência') ? 0.012 : (approvedText && has('subsídio','aumentar gasto') ? -0.006 : 0);
      return {...asset,value:Math.max(0,asset.value*(1+Math.max(-0.035,Math.min(0.035,pct))))};
    });
    setEconomyAssets(newEconomicAssets);
    const groupEffects = {};
    economicGroups.forEach((name,i)=>{
      let delta = growthDelta*0.55 + confidenceDelta*0.12 + fiscalDelta*0.008;
      const rules = [
        [['polícia','militar','defesa','segurança'],['Militares, policiais e praças'],1.8],
        [['igreja','evangélic','católic','religião'],['Evangélicos','Católicos','Terreiros e religiões de matriz africana'],1.1],
        [['agronegócio','agropecuária','crédito rural','exportação','safra'],['Agronegócio','Agricultura familiar'],2.2],
        [['diesel','rodovia','caminhoneiro','frete','combustível'],['Caminhoneiros','Motoristas e entregadores de apps'],2.0],
        [['mei','microempreendedor','pequena empresa','desburocrat'],['MEI'],1.8],
        [['empresa','investimento','desoneração','imposto','regulação'],['Empresariado','Banqueiros','Mercado financeiro'],1.5],
        [['renda','habitação','periferia','bolsa','salário mínimo','pobreza'],['Periferia','Mulheres','Movimento negro','População LGBTQIA+','Povos indígenas','Ribeirinhos e quilombolas'],1.6],
        [['aposentadoria','previdência','benefício'],['Aposentados'],1.7],
        [['sindicato','trabalhador','salário','carteira assinada'],['Sindicalizados','Trabalhadores com carteira'],1.7],
        [['servidor','funcionalismo','concurso','serviço público'],['Servidores públicos'],1.8],
        [['saúde','sus','hospital','enfermagem','médico'],['Profissionais da saúde'],1.8],
        [['educação','escola','professor','universidade','pesquisa','ciência','bolsa de estudo'],['Jovens','Professores','Ciência','Universitários'],1.8],
        [['internet','games','jogos','tecnologia','digital'],['Games','Internet'],1.8],
        [['cultura','artista','audiovisual','música'],['Artistas e cultura'],1.8],
        [['meio ambiente','ambiental','desmatamento','energia limpa','preservação'],['Ambientalistas','Povos indígenas','Ribeirinhos e quilombolas'],1.8],
        [['direitos','discriminação','igualdade','proteção social'],['Mulheres','População LGBTQIA+','Movimento negro','Terreiros e religiões de matriz africana'],1.2],
        [['juros','selic','banco central','inflação'],['Classe média','Banqueiros','Mercado financeiro'],1.0]
      ];
      for (const [keywords,groups,weight] of rules) if (groups.includes(name) && has(...keywords)) delta += weight;
      if (['Classe média','Aposentados','Trabalhadores com carteira'].includes(name)) delta -= Math.max(0,next.inflation-mandateMetrics.inflation)*0.7;
      if (['Empresariado','MEI','Agronegócio'].includes(name) && next.risk>mandateMetrics.risk) delta -= 0.8;
      if (['Periferia','Jovens','Aposentados'].includes(name) && next.poverty<mandateMetrics.poverty) delta += 0.7;
      groupEffects[name] = Math.max(-3,Math.min(3,delta + (((i*13+mandateMonth*3)%5)-2)*0.08));
    });
    setEconomyGroupSentiment(old=>Object.fromEntries(economicGroups.map(name=>[name,Math.max(0,Math.min(100,(old[name]??50)+(groupEffects[name]||0)))])));
    setEconomyEvents(old=>[{month:mandateMonth,title:text?(votePassed?'Medida aprovada':'Proposta rejeitada'):'Mês sem proposta',detail:text?(votePassed?`Efeitos estimados derivados da proposta: ${text}`:'A proposta não entrou em execução; houve desgaste político.'):'Sem nova medida executada. Indicadores mantêm apenas efeitos acumulados e pressões macroeconômicas.',fiscalDelta,growthDelta,confidenceDelta} ,...old].slice(0,8));
    // O primeiro mês é a linha de base; o gráfico começa a registrar meses concluídos a partir do segundo.
    if (mandateMonth > 1) setEconomyHistory(old=>[...old,{month:mandateMonth,gdp:next.gdp,primary:next.primary,approval:next.approval,confidence:next.confidence,credibility:next.credibility,inflation:next.inflation,debt:next.debt}].slice(-48));
    setMandateMetrics(next);
    const month=mandateMonth+1;
    setMandateMonth(month);
    setMandateAgenda(old=>[{month:mandateMonth,title:text||'Nenhuma medida aprovada',status:!text?'Sem proposta':votePassed?'Aprovada e executada':'Rejeitada na votação'},...old].slice(0,12));
    if(!text)setMandateCrises(old=>[{title:'Agenda sem proposta',severity:'Alta',body:'O mês terminou sem uma proposta concreta. A aprovação caiu e a oposição cobra explicações.'},...old].slice(0,5));
    else if(!votePassed)setMandateCrises(old=>[{title:'Derrota no Congresso',severity:'Média',body:'A proposta foi rejeitada. O governo perdeu capital político e precisa negociar uma nova versão.'},...old].slice(0,5));
    else if(text && (next.approval<45 || next.risk>300 || next.inflation>6 || next.debt>90))setMandateCrises(old=>[{title:next.approval<45?'Queda de aprovação':next.risk>300?'Pressão do mercado':next.inflation>6?'Pressão inflacionária':'Alerta fiscal',severity:next.approval<35||next.risk>400?'Alta':'Média',body:'Os indicadores acionaram um alerta coerente com os resultados acumulados da decisão. Escolha uma resposta na aba Crises; os efeitos são simulados.'},...old].slice(0,5));
    const monthNames=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    setMandateNewspaper({month:monthNames[(month-1)%12],year:2027+Math.floor((month-1)/12),title:!text?'Governo fecha o mês sem medida central':!votePassed?'Derrota no Congresso marca o mês':`Governo registra ${impact>=1?'avanços em áreas prioritárias':impact<0?'reação negativa às medidas':'resultados mistos'}`,body:!text?'A falta de uma proposta custou apoio e aumentou a pressão política.':!votePassed?'A proposta não conseguiu maioria. O governo terá de renegociar o texto e lidar com o desgaste.':`A proposta passou pela votação simulada. A aprovação geral agora está em ${next.approval.toFixed(1).replace('.',',')}%, mas os resultados econômicos e sociais seguem mudando gradualmente.`,approval:next.approval,passed:!!text&&votePassed});
    addLog('Fechamento do mês de governo',text?(votePassed?`A proposta “${text}” passou pela votação simulada e alterou os indicadores.`:`A proposta “${text}” foi rejeitada; o governo perdeu apoio.`):'O mês terminou sem proposta; aprovação e confiança caíram.');
    setPolicyDraft('');setMandateTab('painel');setMandateVote(null);
  }
  async function openMandateVote(){
    const text=policyDraft.trim();
    if(!text){setMandateCrises(old=>[{title:'Proposta necessária',severity:'Baixa',body:'Escreva uma proposta concreta antes de encaminhá-la para votação.'},...old].slice(0,5));return;}
    if(policyEvaluationLoading)return;
    const lower=text.toLowerCase();
    setPolicyEvaluationLoading(true);setPolicyEvaluationError('');setMandateVote(null);
    let evaluation;
    try {
      const response=await fetch('/api/evaluate-policy',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({proposal:text})});
      const payload=await response.json();
      if(!response.ok)throw new Error(payload.error||'Falha na avaliação da proposta.');
      evaluation={
        ...payload,
        score:Number.isFinite(Number(payload?.score))?Math.max(0,Math.min(100,Number(payload.score))):50,
        risk:typeof payload?.risk==='string'?payload.risk:'Moderado',
        recommendation:typeof payload?.recommendation==='string'?payload.recommendation:'Avaliação inconclusiva',
        summary:typeof payload?.summary==='string'?payload.summary:'A avaliação não retornou um resumo.',
        legal:typeof payload?.legal==='string'?payload.legal:'Não informado.',
        environmental:typeof payload?.environmental==='string'?payload.environmental:'Não informado.',
        social:typeof payload?.social==='string'?payload.social:'Não informado.',
        economicFiscal:typeof payload?.economicFiscal==='string'?payload.economicFiscal:'Não informado.',
        benefits:Array.isArray(payload?.benefits)?payload.benefits:[],
        risks:Array.isArray(payload?.risks)?payload.risks:[],
        alternatives:Array.isArray(payload?.alternatives)?payload.alternatives:[],
        caveats:Array.isArray(payload?.caveats)?payload.caveats:[],
        indicators:Array.isArray(payload?.indicators)?payload.indicators:[]
      };
    } catch(error) {
      setPolicyEvaluationError(error.message||'Não foi possível avaliar a proposta. Confira se o servidor está ativo e configurado.');
      setPolicyEvaluationLoading(false);return;
    }
    setPolicyEvaluationLoading(false);
    const court=/(constituição|inconstitucional|supremo|stf|ministro do supremo)/i.test(lower);
    const chamber=/(orçamento|imposto|tribut|gasto|lei|programa|saúde|educação|segurança|emprego|saneamento|fauna|caça|caca|abate|veado|ambiental)/i.test(lower);
    const body=court?'STF (análise simulada de constitucionalidade)':chamber?'Câmara dos Deputados (projeto de lei simulado)':'Senado Federal (votação simulada)';
    const total=court?11:chamber?513:81;
    // A avaliação influencia a probabilidade de aprovação, mas não substitui a votação nem garante o resultado.
    const base=0.48+(evaluation.score-55)*0.004-(evaluation.risk==='Crítico'?0.35:evaluation.risk==='Alto'?0.20:evaluation.risk==='Moderado'?0.04:0);
    const probability=Math.max(0.05,Math.min(0.92,base));
    const approved=Math.random()<probability;
    const yes=approved?Math.floor(total*(0.51+Math.random()*0.25)):Math.floor(total*(0.20+Math.random()*0.30));
    const no=total-yes;
    setMandateVote({text,body,yes,no,total,approved,evaluation,probability});
  }
  function respondMandateCrisis(choice,index){
    const c=mandateCrises[index]; if(!c)return;
    const m={...mandateMetrics};
    if(choice==='Transparência'){m.approval=Math.min(90,m.approval+1.2);m.credibility=Math.min(95,m.credibility+2);}
    else if(choice==='Investir recursos'){m.approval=Math.min(90,m.approval+0.7);m.primary-=5;m.debt=Math.min(100,m.debt+0.3);}
    else {m.approval=Math.max(10,m.approval-1.4);m.credibility=Math.max(5,m.credibility-2);}
    setMandateMetrics(m);setMandateCrises(old=>old.filter((_,i)=>i!==index));addLog('Resposta à crise',`O governo respondeu com: ${choice}. Os efeitos são simulados.`);
  }
  function applySavedGame(g){
    if(!g)return;
    if(g.tab!==undefined)setTab(g.tab==='chapa'?'palco':g.tab); if(g.week!==undefined)setWeek(g.week); if(g.actions!==undefined)setActions(g.actions);
    if(g.energy!==undefined)setEnergy(g.energy); if(g.cash!==undefined)setCash(g.cash); if(g.security!==undefined)setSecurity(g.security);
    if(g.candidate!==undefined)setCandidate(g.candidate); if(g.fullName!==undefined)setFullName(g.fullName); if(g.age!==undefined)setAge(g.age);
    if(g.photo!==undefined)setPhoto(g.photo); if(g.created!==undefined)setCreated(g.created); if(g.vice!==undefined)setVice(g.vice);
    if(g.minister!==undefined)setMinister(g.minister); if(g.party!==undefined)setParty(g.party); if(g.allyList!==undefined)setAllyList(g.allyList);
    if(g.chosen!==undefined)setChosen(g.chosen); if(g.statePick!==undefined)setStatePick(g.statePick); if(g.log!==undefined)setLog(g.log);
    if(g.post!==undefined)setPost(g.post); if(g.postResult!==undefined)setPostResult(g.postResult);
    if(g.socialReactions!==undefined)setSocialReactions(g.socialReactions); if(g.selectedCelebrity!==undefined)setSelectedCelebrity(g.selectedCelebrity); if(g.celebrityMeetingResult!==undefined)setCelebrityMeetingResult(g.celebrityMeetingResult);
    if(g.researchState!==undefined)setResearchState(g.researchState); if(g.modal!==undefined)setModal(g.modal); if(g.headline!==undefined)setHeadline(g.headline);
    if(g.message!==undefined)setMessage(g.message); if(g.polls!==undefined)setPolls(g.polls.filter(p=>!['Tarcísio de Freitas','Tarcisio de Freitas','Ratinho Júnior','Ratinho Junior','Geraldo Alckmin'].includes(p.name))); if(g.selectedAction!==undefined)setSelectedAction(g.selectedAction);
    if(g.lastAction!==undefined)setLastAction(g.lastAction); if(g.mapFocus!==undefined)setMapFocus(g.mapFocus); if(g.stateCampaignEffects!==undefined)setStateCampaignEffects(g.stateCampaignEffects); if(g.president!==undefined)setPresident(g.president);
    if(g.cabinet!==undefined)setCabinet(g.cabinet); if(g.mandateMonth!==undefined)setMandateMonth(g.mandateMonth); if(g.mandateTab!==undefined)setMandateTab(g.mandateTab); if(g.selectedIndicators!==undefined)setSelectedIndicators(g.selectedIndicators); if(g.policyDraft!==undefined)setPolicyDraft(g.policyDraft); if(g.mandateMetrics!==undefined)setMandateMetrics(g.mandateMetrics); if(g.economyHistory!==undefined)setEconomyHistory(g.economyHistory); if(g.economyAssets!==undefined)setEconomyAssets(g.economyAssets); if(g.economyGroupSentiment!==undefined)setEconomyGroupSentiment(g.economyGroupSentiment); if(g.economyEvents!==undefined)setEconomyEvents(g.economyEvents); if(g.mandateTrend!==undefined)setMandateTrend(g.mandateTrend); if(g.mandateNewspaper!==undefined)setMandateNewspaper(g.mandateNewspaper); if(g.mandateVote!==undefined)setMandateVote(g.mandateVote); if(g.mandateAgenda!==undefined)setMandateAgenda(g.mandateAgenda); if(g.mandateCrises!==undefined)setMandateCrises(g.mandateCrises); if(g.mandateStarted!==undefined)setMandateStarted(g.mandateStarted); if(g.ministerChoices!==undefined)setMinisterChoices(g.ministerChoices); if(g.cabinetFeedback!==undefined)setCabinetFeedback(g.cabinetFeedback); if(g.debate!==undefined)setDebate(g.debate); if(g.campaignStarted!==undefined)setCampaignStarted(g.campaignStarted);
    if(g.playerShare!==undefined)setPlayerShare(g.playerShare); if(g.activeEvent!==undefined)setActiveEvent(g.activeEvent); if(g.electionResult!==undefined)setElectionResult(g.electionResult);
    if(g.pollInstitute!==undefined)setPollInstitute(g.pollInstitute); if(g.pollSnapshots!==undefined)setPollSnapshots(g.pollSnapshots); if(g.pendingAlly!==undefined)setPendingAlly(g.pendingAlly); if(g.pendingPollImpact!==undefined)setPendingPollImpact(g.pendingPollImpact); if(g.debateDoneWeek!==undefined)setDebateDoneWeek(g.debateDoneWeek); if(g.secondRoundWeeksRemaining!==undefined)setSecondRoundWeeksRemaining(g.secondRoundWeeksRemaining);
  }
  function signInOrRegister(e){
    e.preventDefault(); const email=authEmail.trim().toLowerCase(); const password=authPassword;
    if(!email || !email.includes('@') || !email.includes('.')){setAuthError('Digite um e-mail válido.');return;}
    if(password.length<4){setAuthError('Use uma senha com pelo menos 4 caracteres.');return;}
    let users={}; try{users=JSON.parse(localStorage.getItem('palanque_accounts_v1')||'{}')}catch{users={};}
    if(authMode==='register'){
      if(users[email]){setAuthError('Já existe uma conta neste navegador com esse e-mail. Entre nela ou use outro e-mail.');return;}
      users[email]={password,game:null}; localStorage.setItem('palanque_accounts_v1',JSON.stringify(users));
    } else {
      if(!users[email] || users[email].password!==password){setAuthError('E-mail ou senha incorretos neste navegador.');return;}
    }
    setAuthError(''); setAuthPassword('');
    const user=users[email]; setAccountReady(false); applySavedGame(user.game); setActiveAccount(email); setAccountReady(true);
  }
  function signOut(){
    setAccountReady(false); setActiveAccount(''); setAuthMode('login'); setAuthError(''); setAuthPassword('');
  }
  function resetCampaign(){
    setTab('palco'); setWeek(1); setActions(0); setEnergy(76); setCash(137.7); setSecurity(60);
    setCandidate(''); setFullName(''); setAge(''); setPhoto(''); setCreated(false); setVice(''); setMinister(''); setParty('PL');
    setAllyList(initialAllies); setChosen([]); setStatePick('SP');
    setLog([{type:'Início',title:'A pré-campanha começa',body:'Sua equipe ainda está sendo formada. As primeiras decisões vão definir o rumo da campanha.'}]);
    setPost(''); setPostResult(''); setSocialReactions([]); setSelectedCelebrity(''); setCelebrityMeetingResult(''); setResearchState('Brasil'); setHeadline('Governador sobe no palanque'); setMessage('');
    setPolls(initialRivals.filter(p=>!['Tarcísio de Freitas','Tarcisio de Freitas','Ratinho Júnior','Ratinho Junior'].includes(p.name)));
    setSelectedAction('Caminhada'); setLastAction('Caminhada no Rio de Janeiro'); setMapFocus('RJ'); setStateCampaignEffects({});
    setPresident(''); setCabinet([]); setDebate(false); setCampaignStarted(false); setPlayerShare(partyStartingSupport(party)); setActiveEvent(null); setElectionResult(null);
    setPollInstitute('Quaest'); setPollSnapshots({}); setPendingAlly(null); setPendingPollImpact(0); setDebateAnswer(''); setDebateQuestion(null); setDebateStage(0); setDebateScore(0); setDebateDoneWeek(null);
    setModal('');
    if(activeAccount){
      try{const users=JSON.parse(localStorage.getItem('palanque_accounts_v1')||'{}');if(users[activeAccount]){users[activeAccount].game=null;localStorage.setItem('palanque_accounts_v1',JSON.stringify(users));}}catch(err){console.warn('Não foi possível limpar o save:',err);}
    }
  }
  const selectedAllies=useMemo(()=>allyList.filter(a=>chosen.includes(a.id)),[allyList,chosen]);
  const influence=useMemo(()=>Object.fromEntries(states.map(([uf])=>[uf,Math.max(8,Math.min(92,Math.round(20+((uf.charCodeAt(0)*7+uf.charCodeAt(1)*11)%65)+(chosen.length*2))))])),[chosen]);
  const runoffTopTwo=useMemo(()=>electionResult?.secondRound&&!electionResult.secondRoundDone?(electionResult.firstRound||[]).slice(0,2):null,[electionResult]);
  const playerQualifiedForRunoff=!!(runoffTopTwo&&runoffTopTwo.some(p=>p.name===candidate));
  const playerEliminatedAfterFirstRound=!!(electionResult?.secondRound&&!electionResult.secondRoundDone&&!playerQualifiedForRunoff);
  const campaignClosed=!!(electionResult&&(!electionResult.secondRound||electionResult.secondRoundDone||playerEliminatedAfterFirstRound));
  const sortedPolls=useMemo(()=>{const eligible=polls.filter(p=>!['Tarcísio de Freitas','Tarcisio de Freitas','Ratinho Júnior','Ratinho Junior','Geraldo Alckmin'].includes(p.name));const runoffNames=runoffTopTwo?.map(p=>p.name);return eligible.filter(p=>!runoffNames||runoffNames.includes(p.name)).sort((a,b)=>b.share-a.share);},[polls,runoffTopTwo]);
  const currentPollCandidates=useMemo(()=>[...(runoffTopTwo&&!playerQualifiedForRunoff?[]:[{name:candidate,party,color:'#20c980',share:playerShare}]),...sortedPolls].filter((p,i,arr)=>arr.findIndex(x=>x.name===p.name)===i),[candidate,party,playerShare,sortedPolls,runoffTopTwo,playerQualifiedForRunoff]);
  const instituteNames=['Datafolha','Quaest','PoderData','AtlasIntel','Paraná Pesquisas'];
  function makeInstituteSnapshot(name, source=currentPollCandidates, snapshotWeek=week){
    // A pesquisa Geral replica exatamente os números apresentados no painel Palanque.
    if(name==='Geral') return source.map(p=>({...p})).sort((a,b)=>b.share-a.share);
    // Cada instituto tem uma pequena tendência própria e uma variação semanal independente.
    const bias={'Datafolha':0.25,'Quaest':-0.10,'PoderData':0.40,'AtlasIntel':-0.30,'Paraná Pesquisas':0.12}[name]||0;
    const adjusted=source.map((p,i)=>{
      const stableInstituteOffset=((((i+2)*7+name.length*3)%7)-3)*0.18;
      const weeklyNoise=(Math.random()-0.5)*0.9;
      const drift=(snapshotWeek%4-1.5)*0.08;
      return {...p,share:Math.max(0.1,p.share+bias+stableInstituteOffset+weeklyNoise+drift)};
    });
    return adjusted.sort((a,b)=>b.share-a.share);
  }
  // Uma nova fotografia é publicada uma vez por semana para todos os institutos.
  // Abrir a aba ou alternar entre institutos não recalcula os resultados já publicados.
  useEffect(()=>{
    if(!created)return;
    const next={Geral:makeInstituteSnapshot('Geral',currentPollCandidates,week)};
    instituteNames.forEach(name=>{next[name]=makeInstituteSnapshot(name,currentPollCandidates,week);});
    setPollSnapshots(next);
  },[week,created]);
  const visiblePollCandidates=pollSnapshots[pollInstitute]||makeInstituteSnapshot(pollInstitute,currentPollCandidates,week);
  function changePollInstitute(name){setPollInstitute(name);}

  useEffect(()=>{
    if(!activeAccount || !accountReady)return;
    try{
      const users=JSON.parse(localStorage.getItem('palanque_accounts_v1')||'{}');
      if(!users[activeAccount])return;
      users[activeAccount].game={tab,week,actions,energy,cash,security,candidate,fullName,age,photo,created,vice,minister,party,allyList,chosen,statePick,log,post,postResult,socialReactions,selectedCelebrity,celebrityMeetingResult,researchState,modal,headline,message,polls,selectedAction,lastAction,mapFocus,stateCampaignEffects,president,cabinet,ministerChoices,mandateStarted,cabinetFeedback,mandateMonth,mandateTab,selectedIndicators,policyDraft,mandateMetrics,economyHistory,economyAssets,economyGroupSentiment,economyEvents,mandateAgenda,mandateCrises,mandateTrend,mandateNewspaper,mandateVote,debate,campaignStarted,playerShare,activeEvent,electionResult,pollInstitute,pollSnapshots,pendingAlly,pendingPollImpact,debateDoneWeek,secondRoundWeeksRemaining};
      localStorage.setItem('palanque_accounts_v1',JSON.stringify(users));
    }catch(err){console.warn('Não foi possível salvar o jogo neste navegador:',err);}
  },[activeAccount,accountReady,tab,week,actions,energy,cash,security,candidate,fullName,age,photo,created,vice,minister,party,allyList,chosen,statePick,log,post,postResult,socialReactions,selectedCelebrity,celebrityMeetingResult,researchState,modal,headline,message,polls,selectedAction,lastAction,mapFocus,stateCampaignEffects,president,cabinet,ministerChoices,mandateStarted,cabinetFeedback,mandateMonth,mandateTab,selectedIndicators,policyDraft,mandateMetrics,economyHistory,economyAssets,economyGroupSentiment,economyEvents,mandateAgenda,mandateCrises,mandateTrend,mandateNewspaper,mandateVote,debate,campaignStarted,playerShare,activeEvent,electionResult,pollInstitute,pollSnapshots,pendingAlly,pendingPollImpact,debateDoneWeek,secondRoundWeeksRemaining]);
  const statePollData=useMemo(()=>Object.fromEntries(states.map(([uf])=>{const localBias=((uf.charCodeAt(0)*13+uf.charCodeAt(1)*7)%13)-6;const candidates=[...(!campaignClosed||playerQualifiedForRunoff?[{name:candidate||'Seu candidato',party,color:partyColors[party]||'#20c980',raw:Math.max(0.5,playerShare+localBias+(stateCampaignEffects[uf]||0))}]:[]),...sortedPolls.filter(p=>p.name!=='Indecisos').map(p=>({...p,raw:Math.max(0.5,p.share+(((uf.charCodeAt(0)*5+uf.charCodeAt(1)*3+p.name.length)%11)-5))}))];const total=candidates.reduce((sum,c)=>sum+c.raw,0)||1;const normalized=candidates.map(c=>({...c,share:c.raw/total*100})).sort((a,b)=>b.share-a.share);return [uf,{candidates:normalized,leader:normalized[0],player:normalized.find(c=>c.name===(candidate||'Seu candidato'))}];})),[candidate,party,playerShare,sortedPolls,stateCampaignEffects,campaignClosed,playerQualifiedForRunoff]);
  const stateProjection=useMemo(()=>Object.fromEntries(states.map(([uf])=>[uf,statePollData[uf]?.leader||{}])),[statePollData]);
  function addLog(title,body,type='Aconteceu'){setLog(old=>[{type,title,body},...old].slice(0,5));}
  function finishElection(){
    const field=[{name:candidate,party,color:partyColors[party]||'#20c980',share:playerShare},...polls.filter(p=>p.name!=='Indecisos')];
    // Resultado da urna tem ruído próprio: pesquisa não é resultado exato da eleição.
    const noActionPenalty=actions===0?2.2:0;
    const noisy=field.map(p=>({...p,share:Math.max(0.2,p.share+(Math.random()*2.4-1.2)-(p.name===candidate?noActionPenalty:0))}));
    const total=noisy.reduce((sum,p)=>sum+p.share,0)||1;
    const firstRound=noisy.map(p=>({...p,share:p.share/total*100})).sort((a,b)=>b.share-a.share);
    const winner=firstRound[0];
    const secondRound=winner.share<50.01;
    const qualified=secondRound?firstRound.slice(0,2):firstRound;
    setElectionResult({firstRound,secondRound,secondRoundDone:false,qualifiedNames:qualified.map(p=>p.name)});
    if(secondRound){
      setPolls(qualified.filter(p=>p.name!==candidate).map(p=>({...p,share:p.share,trend:0})));
      // Preserve the first-round vote base; the runoff starts from the relative support of the two finalists, not 50/50.
      const playerFirstRound=qualified.find(p=>p.name===candidate);
      if(playerFirstRound)setPlayerShare(playerFirstRound.share);
      if(!qualified.some(p=>p.name===candidate)){setPendingPollImpact(0);setSecondRoundWeeksRemaining(0);}
    } else {setSecondRoundWeeksRemaining(0);}
    setSecondRoundWeeksRemaining(secondRound&&qualified.some(p=>p.name===candidate)?3:0);
    if(secondRound&&!qualified.some(p=>p.name===candidate)){setModal('electionLost');} else if(!secondRound&&winner.name!==candidate){setModal('electionLost');} else if(!secondRound&&winner.name===candidate){setModal('electionWon');}
    setCampaignStarted(true);
    addLog('Resultado do primeiro turno',secondRound?`${winner.name} terminou em primeiro, mas não passou de 50% dos votos válidos. Os dois mais votados disputarão o segundo turno.`:`${winner.name} venceu no primeiro turno na simulação.`, 'Aviso');
  }
  function advanceWeek(){
    if(electionResult){
      if(electionResult.secondRound&&!electionResult.secondRoundDone){
        if(!electionResult.firstRound.slice(0,2).some(p=>p.name===candidate)){
          addLog('Campanha encerrada','Seu candidato não ficou entre os dois mais votados e está fora do segundo turno. Consulte o resultado do primeiro turno.','Aviso');
          return;
        }
        if(secondRoundWeeksRemaining>0){
          const next=week+1;
          setWeek(next);setActions(0);setEnergy(e=>Math.max(12,e-3));setSecurity(s=>Math.max(20,s-1));
          const runoffOpponent=electionResult.firstRound.slice(0,2).find(p=>p.name!==candidate);
          const playerBase=electionResult.firstRound.find(p=>p.name===candidate)?.share||playerShare;
          const opponentBase=runoffOpponent?.share||50;
          const neglectPenalty=actions===0?0.65:0;
          const movement=(Math.random()*0.8-0.4)+pendingPollImpact*0.18-neglectPenalty;
          const nextPlayer=Math.max(5,Math.min(95,playerShare+movement));
          const nextOpponent=Math.max(5,Math.min(95,(polls.find(p=>p.name===runoffOpponent?.name)?.share??opponentBase)-movement*0.55+(actions===0?0.2:0)));
          const runoffTotal=nextPlayer+nextOpponent||1;
          setPlayerShare(nextPlayer);
          setPolls(old=>old.map(p=>p.name===runoffOpponent?.name?{...p,share:nextOpponent,trend:nextOpponent-(p.share||0)}:p));
          setPendingPollImpact(0);setSecondRoundWeeksRemaining(v=>v-1);
          addLog(`Semana ${next} do segundo turno`,`A campanha continua por mais ${secondRoundWeeksRemaining-1} semana(s). Você pode realizar ações, movimentar apoios e tentar alterar a intenção de voto antes da votação final.`);
          return;
        }
        const top=electionResult.firstRound.slice(0,2);
        const scores=top.map(p=>{
          const current=p.name===candidate?playerShare:(polls.find(x=>x.name===p.name)?.share??p.share);
          const neglectPenalty=actions===0?1.8:0;
          return {...p,share:Math.max(1,current+(Math.random()*2.4-1.2)+(p.name===candidate?-neglectPenalty:0))};
        });
        const total=scores.reduce((sum,p)=>sum+p.share,0)||1;
        const result=scores.map(p=>({...p,share:p.share/total*100})).sort((a,b)=>b.share-a.share);
        setElectionResult(old=>({...old,secondRoundDone:true,secondRoundResult:result}));
        setSecondRoundWeeksRemaining(0);
        addLog('Resultado do segundo turno',`${result[0].name} venceu o segundo turno da simulação com ${result[0].share.toFixed(1).replace('.',',')}%.`, 'Aviso');
        setModal(result[0].name===candidate?'electionWon':'electionLost');
      } else {
        addLog('Eleição encerrada','A simulação eleitoral já terminou. Consulte o resultado no painel.','Aviso');
      }
      return;
    }
    if(week>=13){finishElection();return;}
    const next=week+1;
    setWeek(next);setActions(0);setEnergy(e=>Math.max(12,e-4));setSecurity(s=>Math.max(20,s-1));
    setPolls(old=>old.map(p=>{
      const newsShock=(Math.random()*0.32)-0.14;
      const trendShift=(p.trend||0)*0.12;
      const fatigue=p.share>25?-0.08:0;
      const nextShare=Math.max(0.4,Math.min(45,p.share+newsShock+trendShift+fatigue));
      return {...p,share:nextShare,trend:Math.max(-1,Math.min(1,(p.trend||0)*0.4+newsShock*0.3))};
    }));
    setPlayerShare(v=>{
      const newsShock=(Math.random()*0.22)-0.10;
      const neglectPenalty=actions===0?0.62:0;
      const campaignEffect=actions===0?0:Math.min(0.42,actions*0.14);
      return Math.max(0.5,Math.min(45,v+newsShock+pendingPollImpact+campaignEffect-neglectPenalty));
    });
    setPendingPollImpact(0);
    if(next===13){setActiveEvent(null);finishElection();return;}
    const events=[
      {title:'Governador sinaliza apoio',body:'Um governador abriu conversa com a campanha, mas ainda quer saber quais compromissos estaduais seriam assumidos.',kind:'governor'},
      {title:'Vazamento movimenta Brasília',body:'Uma conversa interna chegou à imprensa. A equipe precisa decidir se responde publicamente ou apura primeiro.',kind:'press'},
      {title:'Debate entra na agenda',body:'A organização de um debate presidencial enviou convite. A equipe precisa preparar prioridades e porta-voz.',kind:'debate'},
      {title:'Pressão por alianças',body:'Lideranças partidárias querem garantias antes de declarar apoio. Uma aliança não está assegurada até haver negociação.',kind:'alliance'},
      {title:'Vídeo viral divide a campanha',body:'Um trecho de entrevista começou a circular fora de contexto. A equipe precisa decidir como responder.',kind:'press'}
    ];
    if(vice && Math.random()<0.22) events.push({title:'O vice entra no noticiário',body:`A escolha de ${vice} para a vice-presidência virou assunto. A imprensa quer saber quais critérios pesaram na decisão.`,kind:'vice'});
    const availableEvents=events.filter(e=>e.title!==headline);
    const event=availableEvents[Math.floor(Math.random()*availableEvents.length)]||events[0];
    setActiveEvent(event);setHeadline(event.title);
    addLog(event.title,`Semana ${next}: ${event.body}`);
  }

  const debateWeeks=[3,7,10,12];
  const secondRoundDebateWeeks=[14,15];
  const debateAvailable=(!electionResult&&debateWeeks.includes(week))||(!!(electionResult?.secondRound&&!electionResult.secondRoundDone&&playerQualifiedForRunoff&&secondRoundWeeksRemaining>0&&secondRoundDebateWeeks.includes(week)));
  const replicaQuestions=['Sua proposta parece boa no discurso, mas como pretende garantir que ela saia do papel e não fique só na promessa?','De onde virá o dinheiro para essa medida sem aumentar a dívida ou prejudicar outros serviços?','Qual é o prazo realista para entregar esse resultado e como a população poderá fiscalizar?','O que diferencia seu plano do que já foi tentado antes e não funcionou?','Se os indicadores não melhorarem, o que sua equipe fará para corrigir a estratégia?','Como sua proposta chega às cidades pequenas e às famílias que mais precisam dela?'];
  const [debateReplica,setDebateReplica]=useState('');
  const debateQuestions=[
    {q:'Como seu governo pretende reduzir o custo de vida sem comprometer as contas públicas?',topic:'Economia',answers:[{label:'Apresentar metas, prazo e fonte de financiamento',score:1.25,why:'Resposta concreta: proposta, execução e responsabilidade fiscal.'},{label:'Prometer baixar todos os preços rapidamente',score:-0.8,why:'Promessa ampla sem explicar como será executada.'},{label:'Dizer que a culpa é exclusivamente dos adversários',score:-1,why:'O ataque não respondeu à pergunta.'}]},
    {q:'Qual é sua proposta prioritária para melhorar a saúde pública?',topic:'Saúde',answers:[{label:'Explicar como ampliar atendimento, equipes e metas de espera',score:1.2,why:'A resposta trouxe medidas e objetivos verificáveis.'},{label:'Dizer apenas que vai investir muito mais',score:0.1,why:'A intenção é positiva, mas faltaram detalhes.'},{label:'Atacar pessoalmente o candidato que perguntou',score:-0.9,why:'O ataque pessoal desviou do tema e prejudicou a imagem.'}]},
    {q:'Como pretende combater a violência e respeitar a lei?',topic:'Segurança',answers:[{label:'Combinar prevenção, investigação e metas de integração',score:1.2,why:'A proposta foi específica e equilibrada.'},{label:'Prometer resolver o problema em poucos meses',score:-0.7,why:'A promessa parece pouco realista e sem plano.'},{label:'Desqualificar a pergunta sem apresentar proposta',score:-0.8,why:'A resposta não apresentou solução.'}]},
    {q:'Como seu governo vai criar empregos e melhorar a educação?',topic:'Emprego e educação',answers:[{label:'Explicar formação profissional, metas e parceria com empresas',score:1.3,why:'A resposta conectou uma proposta a medidas práticas.'},{label:'Usar uma frase de efeito sem explicar a proposta',score:0.2,why:'A frase chamou atenção, mas faltou conteúdo.'},{label:'Interromper o adversário e evitar a pergunta',score:-0.9,why:'A evasão foi percebida negativamente.'}]}
  ];
  function openDebate(){if(!debateAvailable){const upcoming=[...debateWeeks,...secondRoundDebateWeeks].filter(w=>w>week);addLog('Debate fora da agenda',`O próximo debate está marcado para a semana ${upcoming[0]||'—'}.`,'Aviso');return;}if(debateDoneWeek===week){addLog('Debate já realizado','Você já participou do debate desta semana.','Aviso');return;}setDebateQuestion(debateQuestions[Math.floor(Math.random()*debateQuestions.length)]);setDebateReplica(replicaQuestions[Math.floor(Math.random()*replicaQuestions.length)]);setDebateAnswer('');setDebateStage(0);setDebateScore(0);setModal('debate');}
  function scoreDebateText(text){
    const raw=text.trim().toLocaleLowerCase('pt-BR');
    const t=raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(!t)return {score:-1,why:'Você não respondeu à pergunta.'};
    let score=-0.15;
    const proposals=['proponho','proposta','plano','programa','medida','implementar','criar','ampliar','reduzir','investir','garantir','reformar','fortalecer','prioridade','solucao','resolver','construir'];
    const execution=['prazo','meta','orcamento','financiamento','recurso','equipe','fiscalizacao','transparencia','indicador','dados','etapa','parceria','como vamos','por meio','responsavel','prestacao de contas','avaliar','resultado','cronograma'];
    const reasoning=['porque','por isso','ja que','uma vez que','evidencia','dados mostram','por exemplo','comparado','impacto','consequencia','causa','resultado'];
    const attacks=['idiota','burro','imbecil','lixo','canalha','ladrao','vagabundo','incompetente','mentiroso','corrupto','vai se ferrar','cala a boca','nao sabe nada','nao entende nada'];
    const slogan=['vou mudar tudo','vamos mudar tudo','juntos somos mais fortes','o povo merece mais','vou resolver tudo','chega disso','sou a unica solucao','sou o unico que'];
    const count=arr=>arr.filter(w=>t.includes(w)).length;
    const proposalHits=count(proposals), executionHits=count(execution), reasoningHits=count(reasoning), attackHits=count(attacks), sloganHits=count(slogan);
    score+=Math.min(0.42,proposalHits*0.14);
    score+=Math.min(0.48,executionHits*0.16);
    score+=Math.min(0.3,reasoningHits*0.1);
    if(/(nunca|sempre|em poucos dias|resolver tudo|sem nenhum custo)/.test(t))score-=0.2;
    if(attackHits)score-=Math.min(1.1,attackHits*0.42);
    if(sloganHits && proposalHits===0 && executionHits===0)score-=Math.min(0.55,sloganHits*0.28);
    if(/(nao vou responder|nao respondo|fugir da pergunta|isso nao importa)/.test(t))score-=0.55;
    // Sem bônus por quantidade de caracteres: o que conta são as ideias e a forma de sustentá-las.
    score=Math.max(-1,Math.min(1.2,score));
    let why=score>=0.72?'Boa resposta: apresentou proposta, explicou a execução e sustentou o argumento.':score>=0.35?'Resposta consistente, mas pode ganhar força com metas, prazos ou justificativas mais claras.':score>=0?'Resposta genérica ou parcialmente desenvolvida; faltaram medidas concretas ou justificativas.':attackHits?'Ataques e ofensas sem argumento prejudicaram sua avaliação.':'Resposta evasiva, vaga ou baseada em promessas sem sustentação.';
    return {score,why};
  }
  function answerDebate(){
    if(!debateAnswer.trim()||!debateQuestion)return;
    const answer=scoreDebateText(debateAnswer);
    if(debateStage===0){setDebateScore(answer.score);setDebateAnswer('');setDebateStage(1);return;}
    const totalScore=(debateScore+answer.score*0.65)/1.65;
    const finalGrade=Math.max(0,Math.min(100,Math.round(((totalScore+1)/2.2)*100)));
    setDebateScore(finalGrade);
    setPendingPollImpact(v=>Math.max(-3,Math.min(3,v+totalScore)));
    setSecurity(v=>Math.max(0,Math.min(100,v+(totalScore>0.45?3:totalScore<0?-4:0))));
    setEnergy(v=>Math.max(0,v-12));setCash(v=>Math.max(0,v-0.5));setDebate(true);setDebateDoneWeek(week);
    addLog(finalGrade>=80?'Grande desempenho no debate':finalGrade>=60?'Bom desempenho no debate':finalGrade>=40?'Desempenho mediano no debate':'Desempenho ruim no debate',`Nota final: ${finalGrade}/100. ${answer.why} Impacto simulado de ${totalScore>=0?'+':''}${(totalScore*1.4).toFixed(2).replace('.',',')} p.p., a contabilizar no fechamento semanal.`);
    setModal('debateResult');
  }
  function restCampaign(){const recovered=Math.min(100-energy,28);setEnergy(e=>Math.min(100,e+28));addLog('Descanso da campanha',`A equipe reduziu o ritmo e recuperou ${Math.max(0,recovered)} pontos de energia. O descanso ocupa uma das três ações semanais.`);setActions(a=>Math.min(3,a+1));}
  function doAction(action,uf=null){
    const localAction=['Caminhada','Comício','Palanque com governador'].includes(action);
    if(localAction && !uf) uf=statePick;
    if(electionResult&&!(electionResult.secondRound&&!electionResult.secondRoundDone&&secondRoundWeeksRemaining>0)){addLog('Campanha encerrada','Não é possível realizar ações depois da votação final.','Aviso');return;}
    if(actions>=3){addLog('Agenda cheia','Você já realizou três ações nesta semana. Avance a semana para continuar.','Aviso');return;}
    const cost=({'Comício':1.8,'Palanque com governador':1.2,'Debate':0.5,'Podcast':0.4,'Live nas redes':0.3,'Entrevista na imprensa':0.5,'Evento de campanha':1.0,'Reunião diplomática':2.0,'Caminhada':0.7})[action]??0.7;
    const en=({'Caminhada':8,'Comício':14,'Palanque com governador':10,'Debate':12,'Podcast':5,'Live nas redes':4,'Entrevista na imprensa':6,'Evento de campanha':9,'Reunião diplomática':12})[action]??6;
    setCash(c=>Math.max(0,c-cost));setEnergy(e=>Math.max(0,e-en));setActions(a=>a+1);setLastAction(`${action}${localAction&&uf?` em ${states.find(s=>s[0]===uf)?.[1]||uf}`:' no Brasil'}`);
    const actionBase=({'Caminhada':0.34,'Comício':0.48,'Palanque com governador':0.42,'Debate':0.36,'Podcast':0.22,'Live nas redes':0.18,'Entrevista na imprensa':0.28,'Evento de campanha':0.32,'Reunião diplomática':0.16})[action]??0.22;
    const fatiguePenalty=(energy<20?-0.12:0)+(cash<10?-0.08:0);
    const teamBonus=chosen.length>0?0.06:0;
    const localMultiplier=localAction&&uf?0.72+(influence[uf]/100)*0.45:1;
    const smallVariation=(Math.random()*0.12)-0.06;
    const change=Math.max(-0.12,Math.min(0.7,(actionBase+fatiguePenalty+teamBonus+smallVariation)*localMultiplier));
    if(localAction&&uf)setStateCampaignEffects(old=>({...old,[uf]:Math.max(-20,Math.min(20,(old[uf]||0)+change))}));
    setPendingPollImpact(v=>Math.max(-1.2,Math.min(1.2,v+change*0.22)));
    addLog(`${action} realizado`,`${action}${localAction&&uf?` em ${states.find(s=>s[0]===uf)?.[1]||uf}`:' em âmbito nacional'}. Efeito estimado reservado para o fechamento semanal. Custo: R$ ${cost.toFixed(1).replace('.',',')} mi e ${en} de energia.`);
  }
  function inviteAlly(id){const ally=allyList.find(a=>a.id===id);if(chosen.includes(id)){setChosen(c=>c.filter(x=>x!==id));setAllyList(old=>old.map(a=>a.id===id?{...a,status:'Disponível'}:a));addLog('Convite retirado',`A equipe encerrou a negociação com ${ally.name}.`);return;}const conflicts=allyList.filter(a=>chosen.includes(a.id)&&(a.conflict.includes(ally.name)||ally.conflict.includes(a.name)));setPendingAlly(id);setInviteProposal('');setMinister(ally.role);if(conflicts.length){const names=conflicts.map(c=>c.name).join(' e ');setModal('conflict');setMessage(`${ally.name} tem uma rivalidade pública com ${names}. A negociação pode provocar saída de aliados ou reduzir a coesão. Quer prosseguir?`);return;}setModal('invite');setMessage(`Para convencer ${ally.name}, apresente uma proposta concreta. Partido, alianças, função e qualidade da proposta influenciam a chance de aceitar.`);}
  function confirmInvite(){const ally=allyList.find(a=>a.id===pendingAlly);if(!ally)return;if(chosen.length>=4){setModal('');addLog('Equipe completa',`A equipe já tem quatro integrantes. Será preciso reorganizar funções antes de incluir ${ally.name}.`,'Aviso');return;}const proposal=inviteProposal.trim();if(proposal.length<25){setMessage('A proposta está muito vaga. Explique o papel da pessoa e o que a campanha oferece (pelo menos 25 caracteres).');setModal('invite');return;}const concrete=/(coordena|coordenar|liderar|responsável|responsabilidade|programa|proposta|agenda|estratégia|plano|prioridade|orçamento|meta|prazo|autonomia|secretaria|ministério|palanque|comunicação|governador|campanha)/i.test(proposal);const affinity=partyAffinity(party,ally.party);const sameParty=party===ally.party?24:0;const relationBonus=(ally.relation-40)*0.45;const proposalBonus=Math.min(18,Math.floor(proposal.length/35)*3)+(concrete?10:0);const conflictPenalty=allyList.some(a=>chosen.includes(a.id)&&(a.conflict.includes(ally.name)||ally.conflict.includes(a.name)))?22:0;const chance=Math.max(0.08,Math.min(0.92,0.28+sameParty/100+affinity/100+relationBonus/100+proposalBonus/100-conflictPenalty/100));if(Math.random()>chance){setModal('');setAllyList(old=>old.map(a=>a.id===pendingAlly?{...a,relation:Math.max(5,a.relation-3)}:a));addLog('Proposta recusada',`${ally.name} recusou a proposta. Afinidade partidária, relação pessoal e conteúdo da oferta pesaram na negociação. Tente uma proposta mais convincente ou melhore a relação.`,'Aviso');return;}setChosen(c=>[...c,pendingAlly]);setAllyList(old=>old.map(a=>a.id===pendingAlly?{...a,status:'Na equipe',relation:Math.min(100,a.relation+4)}:a));setModal('');addLog('Novo aliado',`${ally.name} aceitou a proposta para atuar em ${minister||ally.role}. A negociação considerou partido (${party===ally.party?'mesmo partido':affinity?'partidos próximos':'partidos distantes'}), relação inicial e qualidade da proposta.`);} 
  function publishPost(){if(!post.trim()){setPostResult('Escreva uma publicação antes de postar.');return;}const text=post.trim();const words=text.split(/\s+/).length;const constructive=/proposta|emprego|saúde|educação|segurança|transporte|plano|transparência|projeto|compromisso|dados|solução/i.test(text);const insult=/assassinar|roubar|ladrão|idiota|burro|matar|ameaça|te roubar|violência/i.test(text);const substantiated=/dados|fonte|orçamento|prazo|meta|como|plano|proposta|projeto/i.test(text);let score=Math.min(1.4,Math.max(-1.8,(constructive?0.55:0)+(substantiated?0.35:0)+(words>12?0.15:0)+(text.length>180?0.1:0)-(insult?1.5:0)-(text.length<18?0.35:0)));setPendingPollImpact(v=>Math.max(-3,Math.min(3,v+score*.12)));setSecurity(s=>Math.max(0,Math.min(100,s+(score>0?.4:-1))));setPostResult(`${score>0?'Recepção positiva':score<0?'Reação negativa':'Recepção morna'}: ${score>0?'+':''}${score.toFixed(2).replace('.',',')} de impacto simulado. A publicação foi avaliada pelo conteúdo, não apenas por ter sido enviada.`);const celebrityVoices=['Gusttavo Lima','Ana Castela','Pablo Marçal','Felca','Felipe Neto','Virginia Fonseca','Neymar Jr.','Rayssa Leal','Whindersson Nunes'];const politicalVoices=['Luiz Inácio Lula da Silva','Flávio Bolsonaro','Romeu Zema','Ronaldo Caiado','Renan Santos','Augusto Cury'];const pickSome=(arr,min,max)=>{const shuffled=[...arr].sort(()=>Math.random()-0.5);return shuffled.slice(0,min+Math.floor(Math.random()*(max-min+1)));};const chosenVoices=[...pickSome(celebrityVoices,2,3),...pickSome(politicalVoices,0,2)];const positive=score>0;const voices=chosenVoices.map((name,i)=>({name,reaction:positive?['A publicação chamou atenção e gerou conversa.','A proposta merece ser debatida com mais detalhes.','O assunto ganhou espaço nas redes.','A mensagem repercutiu entre seguidores.'][Math.floor(Math.random()*4)]:score<0?['O tom da publicação virou assunto.','Faltou explicar melhor alguns pontos.','A repercussão dividiu opiniões.','A postagem gerou comentários críticos.'][Math.floor(Math.random()*4)]:['A publicação teve repercussão moderada.','Seguidores pedem mais detalhes.','O assunto segue em discussão.','A reação nas redes foi discreta.'][Math.floor(Math.random()*4)]}));setSocialReactions(voices);addLog('Repercussão nas redes',`A publicação teve impacto ${score>0?'positivo':score<0?'negativo':'limitado'} na simulação. ${insult?'O tom agressivo gerou críticas.':constructive?'A proposta concreta ajudou a mensagem.':'Faltaram propostas específicas para convencer o público.'} Reações de figuras públicas são fictícias e geradas para a simulação.`);setPost('');}
  function saveSettings(){addLog('Perfil atualizado',`O nome público foi atualizado para ${candidate}. O partido ${party} permanece fixo desde a criação da candidatura.`);setModal('');}
  function meetCelebrity(){const person=celebrityGuests.find(x=>x.name===selectedCelebrity);if(!person){setCelebrityMeetingResult('Escolha uma pessoa para solicitar o encontro.');return;}if(actions>=3){setCelebrityMeetingResult('Você já usou as três ações desta semana.');return;}const cashCost=person.cost;const energyCost=6;if(cash<cashCost){setCelebrityMeetingResult('A campanha não tem recursos suficientes para organizar esse encontro.');return;}const affinity=(party==='PL'&&['Pablo Marçal','Gusttavo Lima','Ana Castela'].includes(person.name))?0.25:0;const chance=Math.max(0.2,Math.min(0.9,0.48+person.base*.08+affinity+(security-50)*.003));const accepted=Math.random()<chance;setCash(v=>Math.max(0,v-cashCost));setEnergy(v=>Math.max(0,v-energyCost));setActions(v=>v+1);if(accepted){const impact=0.12+Math.random()*0.38;setPendingPollImpact(v=>Math.max(-3,Math.min(3,v+impact)));setCelebrityMeetingResult(`${person.name} aceitou participar de um encontro público simulado. O evento gerou visibilidade e impacto potencial de +${impact.toFixed(2).replace('.',',')} p.p., a contabilizar no fechamento da semana.`);addLog('Encontro com famoso',`Encontro simulado com ${person.name} (${person.area}). A participação gerou visibilidade, mas não representa apoio político real.`);}else{const impact=0.08+Math.random()*0.15;setPendingPollImpact(v=>Math.max(-3,Math.min(3,v-impact)));setCelebrityMeetingResult(`${person.name} não confirmou presença. A equipe gastou recursos na tentativa e a repercussão foi pequena.`);addLog('Encontro não confirmado',`A tentativa de organizar encontro com ${person.name} não se confirmou. A campanha gastou recursos sem garantir visibilidade.`);}}

  function renderMap(){const local=statePollData[mapFocus]||{candidates:[],leader:null,player:null};const playerPct=local.player?.share||0;const leader=local.leader;const needed=leader&&leader.name!==(candidate||'Seu candidato')?Math.max(0,leader.share-playerPct+0.1):0;return <div className="map-panel"><div className="map-top"><div><div className="eyebrow">BRASIL • MAPA DE CAMPANHA</div><h2>Onde a campanha acontece</h2><p>Veja a liderança e a intenção de voto simulada em cada estado. As ações de campanha alteram o cenário local e também o percentual nacional.</p></div><select value={mapFocus} onChange={e=>{setMapFocus(e.target.value);setStatePick(e.target.value)}}>{states.map(([uf,n])=><option key={uf} value={uf}>{n}</option>)}</select></div><div className="map-layout"><div className="brazil-map">{states.map(([uf,n])=><button key={uf} className={`state-tile ${mapFocus===uf?'active':''}`} style={{'--heat':`${influence[uf]}%`,background:stateProjection[uf]?.color||'#26343d',borderColor:stateProjection[uf]?.color||'#29413b'}} onClick={()=>{setMapFocus(uf);setStatePick(uf)}} title={n}><span>{uf}</span><small>{Math.round(statePollData[uf]?.player?.share||0)}%</small></button>)}</div><div className="state-detail"><div className="state-symbol">{mapFocus}</div><div className="eyebrow">ESTATÍSTICAS ESTADUAIS</div><h3>{states.find(s=>s[0]===mapFocus)?.[1]}</h3><div className="stat-line"><span>Capital</span><b>{capitals[mapFocus]}</b></div><div className="stat-line"><span>Sua intenção de voto</span><b>{playerPct.toFixed(1).replace('.',',')}%</b></div><div className="meter"><i style={{width:`${Math.min(100,playerPct)}%`}}/></div><div className="stat-line"><span>Líder no estado</span><b>{leader?.name||'—'} ({(leader?.share||0).toFixed(1).replace('.',',')}%)</b></div><div className="stat-line"><span>Para ultrapassar a liderança</span><b>{needed>0?`${needed.toFixed(1).replace('.',',')} p.p.`:'Você está na liderança'}</b></div><div className="state-poll-list"><b>Intenção de voto simulada</b>{local.candidates.slice(0,5).map(c=><div className="stat-line" key={c.name}><span>{c.name}</span><b>{c.share.toFixed(1).replace('.',',')}%</b></div>)}</div><label>Capital para a caminhada<select value={statePick} onChange={e=>{setStatePick(e.target.value);setMapFocus(e.target.value)}}>{states.map(([uf,n])=><option key={uf} value={uf}>{capitals[uf]} — {n}</option>)}</select></label><button className="primary full" disabled={campaignClosed} onClick={()=>doAction('Caminhada',statePick)}>＋ Fazer caminhada em {capitals[statePick]}</button><button className="secondary full" disabled={campaignClosed} onClick={()=>doAction('Comício',mapFocus)}>＋ Organizar comício em {capitals[mapFocus]}</button></div></div></div>}
  if(!activeAccount) return <div className="creation-shell">
    <div className="creation-top"><div className="brand"><span className="brand-star">★</span><b>PALANQUE</b><small>SIMULADOR PRESIDENCIAL</small></div><span>CONTA DO JOGADOR</span></div>
    <div className="creation-wrap"><div className="creation-intro"><div className="hero-kicker"><span/> SUA CAMPANHA, SEU ESPAÇO</div><h1>Entre no<br/><em>Palanque.</em></h1><p>Crie uma conta simples para manter sua própria carreira salva neste navegador. Cada e-mail tem um jogo separado.</p><div className="creation-steps"><span className="active">01 <small>Conta</small></span><i/><span>02 <small>Seu político</small></span><i/><span>03 <small>Eleição</small></span></div></div>
      <form className="creation-card" onSubmit={signInOrRegister}><div className="eyebrow">{authMode==='register'?'NOVA CONTA':'BEM-VINDO DE VOLTA'}</div><h2>{authMode==='register'?'Crie sua conta':'Entrar na sua conta'}</h2><p className="form-hint">Sem código de verificação. Use seu e-mail e uma senha para separar seu progresso.</p><label>E-mail<input required type="email" autoComplete="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="voce@exemplo.com"/></label><label>Senha<input required type="password" minLength={4} autoComplete={authMode==='register'?'new-password':'current-password'} value={authPassword} onChange={e=>setAuthPassword(e.target.value)} placeholder="Pelo menos 4 caracteres"/></label>{authError&&<p role="alert" className="inline-feedback">{authError}</p>}<button className="primary create-submit" type="submit">{authMode==='register'?'Criar conta e continuar':'Entrar e continuar'} <span>→</span></button><p className="form-hint">{authMode==='register'?'Já tem conta?':'Ainda não tem conta?'} <button type="button" className="text-button" onClick={()=>{setAuthMode(authMode==='register'?'login':'register');setAuthError('')}}>{authMode==='register'?'Entrar':'Criar conta'}</button></p><small className="fiction-note">Protótipo: as contas e os jogos ficam salvos apenas neste navegador/computador. Ainda não sincronizam entre dispositivos.</small></form>
    </div></div>;
  if(!created) return <div className="creation-shell">
    <div className="creation-top"><div className="brand"><span className="brand-star">★</span><b>PALANQUE</b><small>SIMULADOR PRESIDENCIAL</small></div><span>ELEIÇÃO PRESIDENCIAL · MODO SIMULAÇÃO</span></div>
    <div className="creation-wrap">
      <div className="creation-intro"><div className="hero-kicker"><span/> SUA HISTÓRIA POLÍTICA COMEÇA AQUI</div><h1>Crie seu<br/><em>candidato.</em></h1><p>Monte sua identidade, escolha seu partido e entre na corrida presidencial. As decisões da campanha serão suas.</p><div className="creation-steps"><span className="active">01 <small>Seu político</small></span><i/><span>02 <small>Pré-campanha</small></span><i/><span>03 <small>Eleição</small></span></div></div>
      <form className="creation-card" onSubmit={e=>{e.preventDefault();if(Number(age)<35){setMessage('Para disputar a Presidência do Brasil, o candidato precisa ter pelo menos 35 anos.');setModal('age-error');return;}if(!vice){setMessage('Escolha um vice-presidente para registrar a chapa e iniciar a candidatura.');setModal('vice-error');return;}setCandidate(candidate.trim());setCreated(true);setCampaignStarted(false);setWeek(1);setActions(0);setElectionResult(null);setActiveEvent(null);setPolls(initialRivals.filter(p=>p.party!==party&&!['Tarcísio de Freitas','Tarcisio de Freitas','Ratinho Júnior','Ratinho Junior','Geraldo Alckmin'].includes(p.name)));setPollSnapshots({});setPlayerShare(Math.max(2,partyStartingSupport(party)+(Math.random()*1.2-0.6)));setLog([{type:'Início',title:'A pré-campanha começa',body:`${candidate.trim()} entrou na corrida presidencial pelo ${party}. A candidatura original desse partido foi retirada da disputa simulada; as demais começam como adversários.`}]);}}>
        <div className="eyebrow">FICHA DO CANDIDATO</div><h2>Quem vai disputar a Presidência?</h2><p className="form-hint">Você cria o seu político. Não começa controlando um candidato pronto.</p>
        <div className="photo-row"><div className="photo-preview">{photo?<img src={photo} alt="Foto do candidato"/>:<span>+</span>}</div><div><b>Foto do candidato <small>(opcional)</small></b><p>Escolha uma imagem do seu computador.</p><label className="upload-button">Escolher foto<input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f){const reader=new FileReader();reader.onload=()=>setPhoto(String(reader.result));reader.readAsDataURL(f);}}}/></label></div></div>
        <label>Nome completo<input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Ex.: João da Silva"/></label>
        <label>Nome político <input required value={candidate} onChange={e=>setCandidate(e.target.value)} placeholder="Como aparecerá nas pesquisas"/></label>
        <div className="creation-fields"><label>Idade <input required type="number" min="35" max="120" value={age} onChange={e=>setAge(e.target.value)} placeholder="Mínimo 35"/></label><label>Partido inicial<select value={party} onChange={e=>{const nextParty=e.target.value;setParty(nextParty);setPlayerShare(Math.max(2,partyStartingSupport(nextParty)+(Math.random()*0.6-0.3)));setPollSnapshots({});setPolls(initialRivals.filter(p=>p.party!==nextParty&&!['Tarcísio de Freitas','Tarcisio de Freitas','Ratinho Júnior','Ratinho Junior','Geraldo Alckmin'].includes(p.name)));}}>{['PL','PT','PSD','MDB','PSOL','PSB','NOVO','Republicanos','União Brasil','PDT','PP','PSDB','Outro'].map(p=><option key={p}>{p}</option>)}</select></label></div>
        <label>Vice-presidente <select required value={vice} onChange={e=>setVice(e.target.value)}><option value="">Escolha seu vice antes de continuar</option>{initialAllies.filter(a=>a.name!=='Geraldo Alckmin').map(a=><option key={a.id} value={a.name}>{a.name} — {a.party}</option>)}<option value="Nome independente">Nome independente</option></select></label>
        <div className="presidency-note"><b>Seu objetivo: Presidência da República</b><span>O cargo inicial é fixo. Trocar de partido, se acontecer, será uma decisão dentro da simulação.</span></div>
        <button className="primary create-submit" type="submit">Entrar na pré-campanha <span>→</span></button>
        <small className="fiction-note">Simulação fictícia. Nomes de figuras públicas e resultados do jogo não representam pesquisas reais nem previsões eleitorais.</small>
      </form>
    </div>
    {(modal==='age-error'||modal==='vice-error')&&<div className="modal-backdrop"><div className="modal"><h2>{modal==='age-error'?'Requisito para a Presidência':'Sua chapa precisa de um vice'}</h2><p>{message}</p><div className="modal-actions"><button className="primary" onClick={()=>setModal('')}>Entendi</button></div></div></div>}
  </div>;
  return <div className="app-shell">
    <style>{`@keyframes paperIn{0%{opacity:0;transform:translateY(-24px) rotate(-1deg) scale(.98)}65%{opacity:1;transform:translateY(3px) rotate(.2deg)}100%{opacity:1;transform:translateY(0) rotate(0) scale(1)}}`}</style>
    <header className="topbar"><button className="menu-btn" onClick={()=>setModal('menu')}>‹ <span>Menu</span></button><div className="brand"><span className="brand-star">★</span><b>PALANQUE</b><small>SIMULADOR PRESIDENCIAL</small></div><div className="top-meta"><span>{playerWonElection?'GOVERNO FEDERAL':'REGISTRO NO TSE'}</span><b>{playerWonElection?'MANDATO PRESIDENCIAL':electionResult?.secondRound&&!electionResult.secondRoundDone?`SEMANA ${week} · CAMPANHA DO 2º TURNO`:`SEMANA ${week} DE 13 · 1º TURNO EM 4 DE OUTUBRO`}</b></div><div className="top-actions"><button title={activeAccount}>CONTA: {activeAccount}</button>{!playerWonElection&&<button onClick={()=>setModal('resetConfirm')}>RESETAR CAMPANHA</button>}<button onClick={signOut}>SAIR</button>{!playerWonElection&&<><button onClick={()=>setModal('bug')}>BUGS / SUGESTÕES</button><button onClick={()=>setModal('settings')}>⚙ AJUSTES</button></>}</div></header>
    <nav className="navtabs">{(playerWonElection?[['mandato','♜','Mandato'],['governo','▣','Governo'],['nacao','◇','Nação'],['economia','$','Economia'],['diplomacia','◉','Diplomacia'],['programas','⬢','Programas'],['vida','◐','Vida pessoal'],['dados','▤','Dados'],['crises','⚠','Crises']]:tabs).map(([id,icon,label])=><button key={id} className={playerWonElection?(id==='mandato'?mandateTab==='painel':mandateTab===id):tab===id} onClick={()=>{if(playerWonElection){setTab('mandato');setMandateTab(id==='mandato'?'painel':id);}else setTab(id);}}><Icon>{icon}</Icon>{label}{playerWonElection&&id==='crises'&&mandateCrises.length>0?` (${mandateCrises.length})`:null}{id==='palco'&&!playerWonElection&&<i className="nav-count">{Math.max(0,sortedPolls.length)}</i>}</button>)}</nav>
    {!playerWonElection&&<section className="hero"><div className="hero-inner"><div className="hero-kicker"><span/> CAMPANHA PRESIDENCIAL · {campaignStarted?'EM ANDAMENTO':'PRÉ-CAMPANHA'}</div><h1>{tab==='palco'?'O PALANQUE':(tabs.find(t=>t[0]===tab)?.[2]||'Mandato').toUpperCase()}</h1><p>{electionResult?.secondRound&&!electionResult.secondRoundDone?`Segundo turno · ${secondRoundWeeksRemaining} semana(s) de campanha restante(s)`: `Semana ${week} de 13 · Primeiro turno em 4 de outubro`} · {3-actions} ações disponíveis nesta semana</p><div className="hero-buttons"><button className="primary" disabled={playerEliminatedAfterFirstRound||!!(electionResult&&!electionResult.secondRound&&!electionResult.secondRoundDone)||!!(electionResult?.secondRoundDone)} onClick={advanceWeek}>Avançar semana ↗</button><button className="ghost" onClick={()=>setModal('settings')}>Editar perfil</button></div></div></section>}
    <main className="workspace">
      {!playerWonElection&&<div className="ticker"><b>PLANTÃO</b><span>{log[0]?.title}: {log[0]?.body}</span></div>}
      {tab==='mandato'&&playerWonElection&&(!mandateStarted||cabinet.length===0)&&<section className="panel page-panel"><div className="eyebrow">PRIMEIRO DIA DE GOVERNO</div><h2>Monte o seu governo</h2><p>Escolha uma pessoa para cada ministério. Depois de dar posse, o jogo avança para o painel mensal do mandato.</p><div className="ministry-grid">{governmentMinistries.map(m=>{const chosenPerson=ministerCandidates.find(p=>p.name===ministerChoices[m.id]);const fit=chosenPerson?ministerFit(chosenPerson,m):null;return <article className="ministry-card" key={m.id}><h3>{m.title}</h3><p>{m.desc}</p><label>Ministro(a)<select value={ministerChoices[m.id]||''} onChange={e=>{setMinisterChoices(v=>({...v,[m.id]:e.target.value}));setCabinetFeedback('');}}><option value="">Escolha uma pessoa</option>{ministerCandidates.map(p=><option key={p.name} value={p.name}>{p.name} — {p.party||'Independente'}{knownGovernors.some(g=>g.name===p.name)?' · liderança estadual':''}</option>)}</select></label>{chosenPerson&&<small className={fit===0?'fit-warning':'fit-ok'}>{fit===0?'Compatibilidade baixa com a pasta.':fit===1?'Compatibilidade limitada.':'Perfil relacionado à função.'} · {chosenPerson.role||'Atuação pública'}</small>}</article>})}</div>{cabinetFeedback&&<div className="inline-feedback">{cabinetFeedback}</div>}<div className="modal-actions"><button className="primary" onClick={swearInCabinet}>Dar posse e iniciar o mandato</button></div></section>}
      {tab==='mandato'&&playerWonElection&&mandateStarted&&cabinet.length>0&&<section className="page-panel" style={{display:'grid',gap:18,color:'#edf3f7'}}>
        <div className="panel" style={{padding:22,background:'#0d141a',border:'1px solid #1d2b35'}}><div style={{display:'flex',justifyContent:'space-between',gap:20,flexWrap:'wrap',alignItems:'center'}}><div style={{display:'flex',gap:14,alignItems:'center'}}><div style={{width:62,height:62,borderRadius:12,overflow:'hidden',border:'2px solid #20c980',background:'#15232c',display:'grid',placeItems:'center',fontSize:28,fontWeight:900}}>{photo?<img src={photo} alt={`Foto de ${candidate}`} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:candidate.slice(0,1).toUpperCase()}</div><div><div className="eyebrow">PALÁCIO DO PLANALTO · SIMULAÇÃO</div><h1 style={{margin:'4px 0',fontSize:30}}>{candidate||fullName||'Presidente eleito'}</h1><p style={{margin:0,color:'#91a8b8'}}>{party} · Presidente da República · Mês {mandateMonth} de 48</p></div></div><div style={{textAlign:'right'}}><div style={{fontSize:24,fontWeight:800}}>Janeiro de {2027+Math.floor((mandateMonth-1)/12)}</div><small style={{color:'#8ba4b5'}}>Plano de governo · Mês {((mandateMonth-1)%12)+1} de 12</small></div></div>
          </div>
        {mandateTab==='painel'&&!mandateVote&&<section className="panel" style={{padding:18,background:'#111b23',border:'1px solid #2d4654',display:'flex',justifyContent:'space-between',alignItems:'center',gap:14,flexWrap:'wrap'}}><div><div className="eyebrow">FECHAMENTO MENSAL</div><b>Pronto para encerrar o mês {mandateMonth}?</b><p style={{margin:'5px 0 0',color:'#91a8b8'}}>Você pode fechar o mês mesmo sem apresentar uma proposta. Os indicadores serão atualizados com os efeitos acumulados.</p></div><button className="primary" onClick={()=>closeMandateMonth(true)}>Fechar mês →</button></section>}
        {mandateTab==='painel'&&mandateNewspaper&&<section className="panel newspaper-panel" style={{padding:22,background:'#f2e8d3',color:'#17212a',border:'1px solid #c4b89e',boxShadow:'0 12px 32px #0004',animation:'paperIn .65s ease-out'}}><div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',borderBottom:'3px double #17212a',paddingBottom:8}}><b style={{fontFamily:'Georgia,serif',fontSize:22,letterSpacing:1}}>O PALANQUE · EDIÇÃO DO GOVERNO</b><small>{mandateNewspaper.month.toUpperCase()} DE {mandateNewspaper.year}</small></div><div style={{fontSize:11,letterSpacing:3,marginTop:12}}>BALANÇO DO MÊS · POLÍTICA NACIONAL</div><h2 style={{fontFamily:'Georgia,serif',fontSize:28,lineHeight:1.1,margin:'8px 0'}}>{mandateNewspaper.title}</h2><p style={{fontFamily:'Georgia,serif',fontSize:16,lineHeight:1.55}}>{mandateNewspaper.body}</p><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap',borderTop:'1px solid #b8ad96',paddingTop:10}}><b>Aprovação geral: {mandateNewspaper.approval.toFixed(1).replace('.',',')}%</b><button className="secondary" onClick={()=>setMandateNewspaper(null)}>Fechar edição ×</button></div></section>}
        {mandateTab==='painel'&&mandateVote&&<section className="panel" style={{padding:22,background:'#111b23',border:'1px solid #425563'}}><div className="eyebrow">TRAMITAÇÃO LEGISLATIVA · SIMULAÇÃO</div><h2>{mandateVote.body}</h2><p><b>Proposta:</b> {mandateVote.text}</p>{mandateVote.evaluation&&<div style={{padding:16,margin:'12px 0',border:'1px solid #344b58',borderLeft:`4px solid ${mandateVote.evaluation.risk==='Crítico'||mandateVote.evaluation.risk==='Alto'?'#ff615c':mandateVote.evaluation.score>=72?'#20c980':'#e6b450'}`,borderRadius:6,background:'#0b1217'}}><div className="eyebrow">AVALIADOR IA · OPENAI · TRIAGEM INFORMATIVA</div><h3 style={{margin:'6px 0'}}>Nota {mandateVote.evaluation.score}/100 · Risco {mandateVote.evaluation.risk}</h3><p><b>Parecer:</b> {mandateVote.evaluation.recommendation}</p><p>{mandateVote.evaluation.summary}</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:10}}>{[['Legalidade',mandateVote.evaluation.legal],['Impacto ambiental',mandateVote.evaluation.environmental],['Impacto social',mandateVote.evaluation.social],['Custos, orçamento e viabilidade fiscal',mandateVote.evaluation.economicFiscal]].map(([title,body])=><div key={title} style={{padding:10,background:'#101b22',borderRadius:5}}><b>{title}</b><p style={{margin:'6px 0'}}>{body}</p></div>)}</div>{[['Benefícios',mandateVote.evaluation.benefits],['Riscos',mandateVote.evaluation.risks],['Alternativas',mandateVote.evaluation.alternatives],['Limitações e dados faltantes',mandateVote.evaluation.caveats]].map(([title,items])=><div key={title}><b>{title}</b><ul style={{paddingLeft:20,marginTop:5}}>{(Array.isArray(items)?items:[]).map((item,i)=><li key={i} style={{margin:'5px 0',color:'#c2d0d9'}}>{typeof item==='string'?item:JSON.stringify(item)}</li>)}</ul></div>)}<b>Indicadores que podem mudar</b><ul style={{paddingLeft:20}}>{(Array.isArray(mandateVote.evaluation.indicators)?mandateVote.evaluation.indicators:[]).map((item,i)=><li key={i} style={{margin:'5px 0',color:'#c2d0d9'}}><b>{item?.name||'Indicador'} — {item?.direction||'incerto'}:</b> {item?.reason||'Sem justificativa informada.'}</li>)}</ul><small style={{display:'block',marginTop:10,color:'#91a8b8'}}>Triagem automatizada para fins de jogo; não é parecer jurídico, auditoria fiscal nem decisão de órgão público. A votação simulada abaixo é independente do parecer.</small></div>}<p>Resultado da votação: <b style={{color:mandateVote.approved?'#20c980':'#ff7777'}}>{mandateVote.approved?'APROVADA':'REJEITADA'}</b></p><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10}}><div style={{padding:14,background:'#123327',borderRadius:6}}><small>Votos favoráveis</small><div style={{fontSize:28,fontWeight:800}}>{mandateVote.yes}</div></div><div style={{padding:14,background:'#351f25',borderRadius:6}}><small>Votos contrários</small><div style={{fontSize:28,fontWeight:800}}>{mandateVote.no}</div></div></div><p style={{color:'#91a8b8'}}>A votação é uma simulação narrativa, não representa votos reais de parlamentares ou decisões do STF. A aprovação/rejeição altera o resultado do mês.</p><button className="primary" onClick={()=>closeMandateMonth(mandateVote.approved)}>Confirmar resultado e fechar mês →</button></section>}
        {mandateTab==='painel'&&<><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(155px,1fr))',gap:12}}>{selectedIndicators.map(label=>{const key=mandateIndicatorLabels[label];const val=mandateMetrics[key];const suffix=['approval','gdp','unemployment','inflation','debt','credibility','productivity','confidence','sewage','poverty'].includes(key)?'%':key==='gas'?'':' ';const display=key==='gas'?`R$ ${val.toFixed(2)}`:key==='idh'?val.toFixed(2):key==='primary'?`${val>0?'+':''}${val.toFixed(0)} bi`:key==='risk'?`${val.toFixed(0)} pts`:key==='life'?`${val.toFixed(1)} anos`:key==='infantMortality'?`${val.toFixed(1)} por mil`:key==='homicides'||key==='femicide'?`${val.toFixed(1)} por 100 mil`:`${val.toFixed(1).replace('.',',')}${suffix}`;return <article key={label} className="panel" style={{padding:16,background:'#0d141a',border:'1px solid #1d2b35'}}><small style={{color:'#8ca6b8'}}>{label}</small><div style={{fontSize:30,fontWeight:850,color:key==='approval'?(val>=50?'#20c980':'#ff615c'):'#f2f5f7',margin:'8px 0'}}>{display}</div><small style={{color:'#8ca6b8'}}>{(()=>{const d=(mandateTrend[key]||[]).slice(-1)[0]||0;const downIsGood=['unemployment','inflation','debt','gas','selic','dollar','risk','primary','infantMortality','femicide','homicides','poverty'].includes(key);const up=d>0.0001,down=d< -0.0001;const symbol=up?'↑':down?'↓':'→';const good=downIsGood?down:up;return <span style={{color:up||down?(good?'#20c980':'#ff7777'):'#91a8b8',fontWeight:800}}>{symbol} {up?'+':''}{d.toFixed(key==='idh'?3:2).replace('.',',')} no mês</span>})()}</small></article>})}</div>
          <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.5fr) minmax(270px,1fr)',gap:16}}><section className="panel" style={{padding:18,background:'#0d141a'}}><h2>Mapa de aprovação por estado</h2><p style={{color:'#91a8b8'}}>Representação ilustrativa: verde indica maior aprovação e vermelho menor aprovação.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(70px,1fr))',gap:7}}>{states.map(([uf,name],i)=>{const v=Math.max(20,Math.min(85,mandateMetrics.approval+((i*17)%19)-9));const hue=Math.round((v-20)/65*120);return <div key={uf} title={`${name}: ${v.toFixed(1)}%`} style={{background:`hsl(${hue} 55% 25%)`,border:'1px solid #263743',borderRadius:6,padding:'10px 6px',textAlign:'center'}}><b>{uf}</b><div style={{fontSize:13}}>{v.toFixed(0)}%</div></div>})}</div><small style={{color:'#91a8b8'}}>Mapa em blocos por UF nesta versão; a aprovação estadual varia dentro da simulação.</small></section><section className="panel" style={{padding:18,background:'#0d141a'}}><h2>O que você vai assinar?</h2><p style={{color:'#91a8b8'}}>Registre uma medida. A IA faz uma triagem antes da votação simulada independente.</p><textarea value={policyDraft} onChange={e=>setPolicyDraft(e.target.value)} rows={5} maxLength={1200} placeholder={'Ex.: ampliar o saneamento, reduzir impostos sobre contratação ou reforçar a atenção básica...'} style={{width:'100%',boxSizing:'border-box',background:'#080d11',color:'#edf3f7',border:'1px solid #263743',padding:12,borderRadius:5}}/><div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:10,flexWrap:'wrap'}}><small style={{color:'#91a8b8'}}>{policyDraft.length}/1200 caracteres</small><button className="primary" disabled={policyEvaluationLoading} onClick={openMandateVote}>{policyEvaluationLoading?'Avaliando com OpenAI…':'Avaliar e encaminhar para votação →'}</button></div>{policyEvaluationError&&<p role="alert" style={{color:'#ff9b93',marginTop:10}}>{policyEvaluationError}</p>}</section></div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:14}}><section className="panel" style={{padding:18,background:'#0d141a'}}><h2>Agenda do mandato</h2>{mandateAgenda.slice(0,5).map((a,i)=><p key={i} style={{borderBottom:'1px solid #1d2b35',paddingBottom:8}}><b>Mês {a.month}: {a.title}</b><br/><small style={{color:'#91a8b8'}}>{a.status}</small></p>)}</section><section className="panel" style={{padding:18,background:'#0d141a'}}><h2>A oposição</h2>{initialRivals.filter(p=>p.name!=='Indecisos'&&p.name!=='Flávio Bolsonaro'&&p.name!==candidate&&p.name!==vice&&p.party!==party&&!cabinet.some(c=>c.name===p.name)&&!initialAllies.some(a=>a.name===p.name)).slice(0,3).map((p,i)=><div key={p.name} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #1d2b35'}}><span>{p.name}<small style={{display:'block',color:'#91a8b8'}}>{p.party}</small></span><b>{Math.max(1,(p.share+(50-mandateMetrics.approval)*0.08)).toFixed(1).replace('.',',')}% intenção simulada</b></div>)}<small style={{color:'#91a8b8'}}>Projeções narrativas do jogo, não pesquisas reais.</small></section></div></>}
        {mandateTab==='dados'&&<section className="panel" style={{padding:20,background:'#0d141a'}}><h2>Dados nacionais e indicadores do governo</h2><p style={{color:'#91a8b8'}}>Todos os indicadores disponíveis ficam nesta aba. Marque até 12 para exibir no painel Mandato; as medidas assinadas e as respostas às crises atualizam estes valores.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:10}}>{Object.keys(mandateIndicatorLabels).map(label=><label key={label} style={{display:'flex',gap:9,alignItems:'center',padding:10,border:'1px solid #24333d',borderRadius:5}}><input type="checkbox" checked={selectedIndicators.includes(label)} disabled={!selectedIndicators.includes(label)&&selectedIndicators.length>=12} onChange={e=>setSelectedIndicators(old=>e.target.checked?[...old,label]:old.filter(x=>x!==label))}/><span style={{display:'flex',flex:1,justifyContent:'space-between',gap:10}}><span>{label}</span><b style={{whiteSpace:'nowrap',color:'#dce8ef'}}>{(()=>{const k=mandateIndicatorLabels[label],v=mandateMetrics[k];return k==='gas'?`R$ ${v.toFixed(2)}`:k==='idh'?v.toFixed(2):k==='primary'?`${v.toFixed(0)} bi`:k==='risk'?`${v.toFixed(0)} pts`:k==='life'?`${v.toFixed(1)} anos`:k==='infantMortality'?`${v.toFixed(1)} por mil`:k==='homicides'||k==='femicide'?`${v.toFixed(1)} por 100 mil`:`${v.toFixed(1).replace('.',',')}${['approval','gdp','unemployment','inflation','debt','credibility','productivity','confidence','sewage','poverty'].includes(k)?'%':''}`;})()}</b></span></label>)}</div><p>{selectedIndicators.length} de 12 selecionados</p><button className="primary" onClick={()=>setMandateTab('painel')}>Salvar indicadores</button></section>}
        {mandateTab==='crises'&&<section className="panel" style={{padding:20,background:'#0d141a'}}><h2>Crises e decisões importantes</h2>{mandateCrises.length===0?<p>Não há crises abertas neste momento. Novas situações podem surgir ao longo dos meses.</p>:mandateCrises.map((c,i)=><article key={`${c.title}-${i}`} style={{padding:14,marginBottom:10,border:'1px solid #51373a',borderLeft:'3px solid #ff615c',borderRadius:6,background:'#171316'}}><b>{c.title}</b><small style={{display:'block',color:'#ffb0a8',margin:'4px 0'}}>{c.severity}</small><p>{c.body}</p><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><button className="primary" onClick={()=>respondMandateCrisis('Transparência',i)}>Responder com transparência</button><button className="secondary" onClick={()=>respondMandateCrisis('Investir recursos',i)}>Investir recursos</button><button className="secondary" onClick={()=>respondMandateCrisis('Adiar decisão',i)}>Adiar decisão</button></div></article>)}</section>}
        {mandateTab==='nacao'&&<section style={{display:'grid',gap:16}}>
          <div className="panel" style={{padding:0,overflow:'hidden',background:'#0d141a'}}><div style={{padding:'30px 24px',background:'linear-gradient(90deg,rgba(4,10,14,.94),rgba(4,10,14,.55)),linear-gradient(0deg,#18252c,#40545b)',borderBottom:'1px solid #263743'}}><div className="eyebrow" style={{color:'#20c980'}}>O PAÍS, POR CIMA · MÊS {mandateMonth}</div><h1 style={{fontSize:'clamp(28px,4vw,42px)',margin:'8px 0'}}>SITUAÇÃO NACIONAL</h1><p style={{color:'#c5d2da'}}>Indicadores sociais, economia, população e aprovação — atualizados pela simulação das suas decisões.</p><div style={{display:'flex',gap:34,flexWrap:'wrap',marginTop:18}}><div><b style={{fontSize:23,color:'#ffc857'}}>{mandateMetrics.idh.toFixed(3).replace('.',',')}</b><small style={{display:'block'}}>IDH simulado</small></div><div><b style={{fontSize:23}}>{Math.max(1,Math.round((mandateMetrics.idh-.45)*100))}º</b><small style={{display:'block'}}>posição ilustrativa</small></div><div><b style={{fontSize:23,color:mandateMetrics.approval>=50?'#20c980':'#ff615c'}}>{mandateMetrics.approval.toFixed(1).replace('.',',')}%</b><small style={{display:'block'}}>aprovação do governo</small></div></div></div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',padding:'12px 18px',borderBottom:'1px solid #263743'}}>{['PANORAMA','GRUPOS SOCIAIS','MAPA E ESTADOS','AS RUAS','MOVIMENTOS','EM ALTA','REDES','SEGURANÇA'].map(t=><button key={t} className={nationSubtab===t?'primary':'secondary'} onClick={()=>setNationSubtab(t)} style={{fontSize:11,padding:'9px 12px'}}>{t}</button>)}</div>
          <div style={{padding:18}}><p style={{fontSize:12,color:'#8ca6b8'}}>Os indicadores abaixo refletem o estado atual da simulação. Mudanças de política têm efeitos diferentes e podem levar meses ou anos; valores sem mudança aparecem com traço.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:16}}>{(nationSubtab==='SEGURANÇA'?[['Segurança',[['Homicídios por 100 mil','homicides',' por 100 mil'],['Feminicídio por 100 mil','femicide',' por 100 mil']]]]:nationSubtab==='GRUPOS SOCIAIS'?[['Sociedade',[['Pobreza','poverty','%'],['Desigualdade (Gini)','gini',''],['Renda média','income',' por mês'],['Escolaridade média','schooling',' anos'],['Acesso à internet','internet','%']]]]:nationSubtab==='MAPA E ESTADOS'?[['Brasil por estado',[['Aprovação do governo','approval','%'],['IDH','idh',''],['Pobreza','poverty','%']]]]:nationSubtab==='AS RUAS'?[['Serviços e qualidade de vida',[['Esgoto coletado','sewage','%'],['Expectativa de vida','life',' anos'],['Mortalidade infantil','infantMortality',' por mil']]]]:nationSubtab==='MOVIMENTOS'?[['Indicadores em movimento',[['Aprovação do governo','approval','%'],['Confiança','confidence','/100'],['Credibilidade fiscal','credibility','/100']]]]:nationSubtab==='EM ALTA'?[['Variação no mês',[['Crescimento do PIB','gdp','%'],['Desemprego','unemployment','%'],['Inflação (IPCA 12m)','inflation','%'],['Pobreza','poverty','%']]]]:nationSubtab==='REDES'?[['Opinião pública',[['Aprovação do governo','approval','%'],['Confiança','confidence','/100'],['Credibilidade fiscal','credibility','/100']]]]:[['Sociedade',[['Expectativa de vida','life',' anos'],['Mortalidade infantil','infantMortality',' por mil'],['Homicídios por 100 mil','homicides',' por 100 mil'],['IDEB (fundamental)','ideb',''],['Alfabetização','literacy','%'],['Esgoto coletado','sewage','%'],['Pobreza','poverty','%'],['Desigualdade (Gini)','gini',''],['Índice ambiental','environment',' de 100'],['Renda média','income',' por mês'],['Escolaridade média','schooling',' anos'],['Acesso à internet','internet','%'],['IDH','idh',''],['Integridade pública','integrity','/100']]],['Economia',[['Crescimento do PIB','gdp','%'],['Desemprego','unemployment','%'],['Inflação (IPCA 12m)','inflation','%'],['Comida (IPCA alimentos)','foodInflation','%'],['Selic','selic','%'],['Dívida bruta','debt','% do PIB'],['Risco-país','risk',' pb'],['Credibilidade fiscal','credibility','/100'],['Resultado primário','primary',' bi'],['Dólar','dollar',' R$'],['Produtividade','productivity','/100'],['Confiança','confidence','/100'],['Gasolina','gas',' R$/L']]]]).map(([group,items])=><section className="panel" key={group} style={{padding:14,background:'#0d141a'}}><h3 style={{margin:'0 0 10px',paddingBottom:10,borderBottom:'1px solid #263743'}}>{group}</h3>{items.map(([label,key,unit])=>{const fallbacks={gini:Math.max(.3,Math.min(.7,.42+mandateMetrics.poverty/300)),ideb:Math.max(2,Math.min(10,4.2+(mandateMetrics.credibility-40)/25)),literacy:Math.max(70,Math.min(100,90+(mandateMetrics.confidence-50)/12)),environment:Math.max(0,Math.min(100,35+mandateMetrics.sewage*.25)),income:Math.max(900,3215+(mandateMetrics.gdp-2.2)*120-mandateMetrics.poverty*8),schooling:Math.max(5,Math.min(14,8.8+(mandateMetrics.credibility-40)/12)),internet:Math.max(40,Math.min(100,78+(mandateMetrics.productivity-50)*.35)),integrity:Math.max(0,Math.min(100,mandateMetrics.credibility*.65)),foodInflation:Math.max(0,mandateMetrics.inflation+.7)};const val=mandateMetrics[key]??fallbacks[key]??0;const d=(mandateTrend[key]||[]).slice(-1)[0]||0;const downGood=['unemployment','inflation','foodInflation','debt','risk','primary','infantMortality','homicides','femicide','poverty','gini'].includes(key);const arrow=Math.abs(d)<.0001?'—':d>0?'▲':'▼';const good=d===0?null:(downGood?d<0:d>0);const shown=key==='life'?val.toFixed(1):key==='idh'?val.toFixed(3):key==='gas'?`R$ ${val.toFixed(2)}`:key==='income'?`R$ ${val.toLocaleString('pt-BR',{maximumFractionDigits:0})}`:key==='primary'?val.toFixed(0):val.toLocaleString('pt-BR',{maximumFractionDigits:1,minimumFractionDigits:1});return <div key={key} style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid #1d2b35'}}><div><b style={{fontSize:14}}>{label}</b><small style={{display:'block',fontSize:10,color:'#83a0b4'}}>impacto de políticas e condições acumuladas</small></div><b style={{whiteSpace:'nowrap'}}>{shown}{unit==='%'||unit==='/100'||unit===' anos'||unit===' por mil'||unit===' por 100 mil'||unit===' de 100'||unit===' pb'||unit===' bi'||unit==='% do PIB'?unit:''} <span style={{color:good===null?'#91a8b8':good?'#20c980':'#ff615c',fontSize:12}}>{arrow}</span></b></div>})}</section>)}</div>
          {nationSubtab==='MAPA E ESTADOS'&&<section className="panel" style={{padding:16,marginTop:16}}><h3>Aprovação por estado</h3><p style={{color:'#8ca6b8'}}>Estimativa ilustrativa calculada a partir da aprovação nacional e das diferenças regionais do jogo.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(75px,1fr))',gap:7}}>{states.map(([uf,name],i)=>{const v=Math.max(10,Math.min(90,mandateMetrics.approval+((i*17)%19)-9));const hue=Math.round((v-10)/80*120);return <div key={uf} title={`${name}: ${v.toFixed(1)}%`} style={{background:`hsl(${hue} 48% 24%)`,border:'1px solid #263743',borderRadius:5,padding:9,textAlign:'center'}}><b>{uf}</b><div>{v.toFixed(0)}%</div></div>})}</div></section>}
          <section className="panel" style={{padding:16,marginTop:16}}><h3>População · estimativa da simulação</h3><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10}}>{[[`${(203.1+(mandateMonth-1)*.025).toFixed(1).replace('.',',')} mi`,'População'],[`${Math.max(-.5,Math.min(1.2,.37+(mandateMetrics.gdp-2.2)*.025-mandateMetrics.unemployment*.008)).toFixed(2).replace('.',',')}%`,'Crescimento anual'],[`${Math.max(1.1,Math.min(2.4,1.52+(mandateMetrics.confidence-50)*.002)).toFixed(2).replace('.',',')}`,'Fecundidade'],[`${Math.max(5,10.7+(mandateMetrics.confidence-50)*-.025).toFixed(1).replace('.',',')}`,'Natalidade por mil'],[`${Math.max(3,7.1+(mandateMetrics.life-75.5)*-.1+mandateMetrics.infantMortality*.015).toFixed(1).replace('.',',')}`,'Mortalidade por mil'],[`${(17.2+(mandateMonth-1)*.015).toFixed(1).replace('.',',')}%`,'População 60+'],[`${Math.round(28000+(mandateMetrics.gdp-2.2)*1200) .toLocaleString('pt-BR')}`,'Saldo migratório'],[`${Math.max(0,Math.min(100,Math.round((mandateMetrics.confidence-35)*1.2)))}/100`,'Política familiar'],[`${Math.max(0,Math.min(100,Math.round((mandateMetrics.credibility-30)*1.5)))}`,'Política migratória']].map(([v,l])=><div key={l} style={{border:'1px solid #263743',borderRadius:5,padding:14}}><b style={{fontSize:23}}>{v}</b><small style={{display:'block',color:'#8ca6b8'}}>{l}</small></div>)}</div><small style={{display:'block',marginTop:10,color:'#8ca6b8'}}>Estimativas simplificadas do jogo: parte dos valores reage à economia, à confiança e aos indicadores sociais; não são projeções oficiais nem todos os efeitos demográficos são imediatos.</small></section>
          </div></div>
        </section>}
        {['governo','economia','diplomacia','programas','vida'].includes(mandateTab)&&<section className="panel" style={{padding:20,background:'#0d141a'}}><div className="eyebrow">{mandateTab.toUpperCase()} · MÊS {mandateMonth}</div><h2>{({governo:'Equipe e ministérios',economia:'Economia e contas públicas',diplomacia:'Agenda diplomática',programas:'Programas prioritários',vida:'Agenda presidencial'})[mandateTab]}</h2>{mandateTab==='governo'?<><p>Você pode reorganizar o gabinete. Escolhas mais compatíveis melhoram confiança; trocas frequentes geram desgaste.</p><div className="ministry-grid">{governmentMinistries.map(m=><article className="ministry-card" key={m.id}><h3>{m.title}</h3><label>Ministro(a)<select value={ministerChoices[m.id]||''} onChange={e=>setMinisterChoices(v=>({...v,[m.id]:e.target.value}))}>{ministerCandidates.map(p=><option key={p.name} value={p.name}>{p.name} — {p.party||'Independente'}</option>)}</select></label></article>)}</div><button className="primary" onClick={()=>{const updated=governmentMinistries.map(m=>{const person=ministerCandidates.find(p=>p.name===ministerChoices[m.id]);return {ministry:m.id,name:person?.name||'Vaga aberta',party:person?.party||'Independente',fit:person?ministerFit(person,m):0};});const changes=updated.filter(c=>!cabinet.some(o=>o.ministry===c.ministry&&o.name===c.name)).length;setCabinet(updated);setMandateMetrics(m=>({...m,approval:Math.max(5,Math.min(90,m.approval-changes*0.25)),confidence:Math.max(5,Math.min(95,m.confidence+(changes?-changes*0.3:0.5)))}));addLog('Reforma ministerial',`O gabinete foi atualizado; ${changes} pasta(s) mudaram e os indicadores refletiram o impacto político.`);}}>Confirmar gabinete e calcular impacto</button></>:mandateTab==='economia'?<div style={{display:'grid',gap:16}}>
          <p style={{color:'#9eb2c0',marginTop:0}}>Painel econômico da simulação. Os valores de referência são estimativas de jogo, não cotações em tempo real. As mudanças decorrem das propostas, dos indicadores do mandato e de choques pequenos e limitados.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:10}}>{[
            ['Credibilidade fiscal',`${mandateMetrics.credibility.toFixed(1)} / 100`,'Acompanha resultado primário, dívida e previsibilidade.'],
            ['Confiança empresarial',`${mandateMetrics.confidence.toFixed(1)} / 100`,'Reage à atividade, ao risco e à estabilidade regulatória.'],
            ['Commodities',`Índice ${Math.round(100+(mandateMetrics.dollar-5.42)*4+(mandateMetrics.gdp-2.2)*2)}`,'Índice sintético de referência; não é cotação de mercado.'],
            ['PIB nominal',`R$ ${(12.3*(1+mandateMetrics.gdp/100)).toFixed(2)} tri`,'Estimativa-base do jogo, atualizada pelo crescimento simulado.'],
            ['Resultado primário',`${mandateMetrics.primary>=0?'+':''}${mandateMetrics.primary.toFixed(1)} bi`,'Valor anualizado simplificado da simulação.'],
            ['Resultado primário / PIB',`${(mandateMetrics.primary/(12300)*100).toFixed(2).replace('.',',')}%`,'Indicador derivado do resultado primário e PIB-base.'],
            ['Arrecadação tributária',`R$ ${(3.5+Math.max(-1,mandateMetrics.gdp-2.2)*0.12+(mandateMetrics.inflation-4.5)*0.025).toFixed(2)} tri`,'Estimativa de referência, sensível à atividade e à inflação.'],
            ['Reservas internacionais',`US$ ${(350+(mandateMetrics.credibility-56)*0.35).toFixed(1)} bi`,'Referência sintética; políticas comuns não criam reservas automaticamente.'],
            ['Ibovespa (índice simulado)',`${Math.round(132000+(mandateMetrics.confidence-54)*850-(mandateMetrics.risk-210)*22) .toLocaleString('pt-BR')}`,'Índice ilustrativo vinculado à confiança e ao risco fiscal.'],
            ['Risco soberano',`${mandateMetrics.risk} pontos`,'O risco sobe com instabilidade e cai com credibilidade fiscal.']
          ].map(([label,value,desc])=><article key={label} style={{padding:15,border:'1px solid #263743',borderRadius:8,background:'#111b23'}}><small style={{color:'#94aab9'}}>{label}</small><div style={{fontSize:23,fontWeight:850,margin:'8px 0',color:'#edf4f8'}}>{value}</div><small style={{color:'#8197a6'}}>{desc}</small></article>)}</div>
          <section style={{border:'1px solid #263743',borderRadius:8,padding:16,background:'#0d141a'}}><h3 style={{marginTop:0}}>Patrimônio vendável da União</h3><p style={{color:'#91a8b8'}}>Valores indicativos para o jogo, em R$ bilhões. Não representam avaliação contábil oficial nem significam que todo o ativo esteja disponível para venda. A participação remanescente em Eletrobras é uma estimativa de jogo e deve ser conferida antes de ser tratada como avaliação oficial.</p><div style={{display:'grid',gap:8}}>{economyAssets.map(asset=><div key={asset.name} style={{display:'grid',gridTemplateColumns:'minmax(140px,1.7fr) minmax(70px,.6fr) minmax(70px,2fr)',gap:10,alignItems:'center',padding:'9px 0',borderBottom:'1px solid #1d2b35'}}><span>{asset.name}</span><b style={{textAlign:'right'}}>R$ {asset.value.toFixed(1).replace('.',',')} bi</b><div style={{height:7,background:'#1c2c36',borderRadius:9,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.max(0,Math.min(100,asset.value/420*100))}%`,background:'#20c980',borderRadius:9}}/></div></div>)}</div><small style={{display:'block',marginTop:10,color:'#8197a6'}}>A variação mensal deriva de confiança, risco, crescimento e decisões relacionadas ao setor; não há venda automática de ativos sem uma decisão explícita.</small></section>
          <section style={{border:'1px solid #263743',borderRadius:8,padding:16,background:'#0d141a'}}><h3 style={{marginTop:0}}>Como cada grupo sente a economia</h3><p style={{color:'#91a8b8'}}>Índice de percepção de 0 a 100. É uma aproximação de jogo baseada nos efeitos econômicos e no tema da proposta; não é uma pesquisa real de opinião.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:9}}>{economicGroups.map(name=>{const score=economyGroupSentiment[name]??50;return <div key={name} style={{padding:10,border:'1px solid #22323d',borderRadius:6}}><div style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'center'}}><span style={{fontSize:13}}>{name}</span><b style={{color:score>=60?'#20c980':score<40?'#ff7777':'#e6b450'}}>{score.toFixed(1).replace('.',',')}</b></div><div style={{height:5,background:'#1c2c36',borderRadius:8,marginTop:8,overflow:'hidden'}}><div style={{height:'100%',width:`${score}%`,background:score>=60?'#20c980':score<40?'#ff7777':'#e6b450'}}/></div></div>})}</div></section>
          <section style={{border:'1px solid #263743',borderRadius:8,padding:16,background:'#0d141a'}}><h3 style={{marginTop:0}}>Aprovação e economia ao longo do mandato</h3><p style={{color:'#91a8b8'}}>O histórico começa após o primeiro mês. Nenhuma barra é criada para o mês inicial, conforme a regra do jogo.</p>{economyHistory.length===0?<div style={{padding:24,textAlign:'center',border:'1px dashed #344753',borderRadius:6,color:'#91a8b8'}}>Ainda não há meses concluídos suficientes para formar o gráfico. Feche o próximo mês de governo para registrar a evolução.</div>:<><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(38px,1fr))',gap:5,alignItems:'end',height:190,marginTop:15}}>{economyHistory.map(point=><div key={point.month} title={`Mês ${point.month}: PIB ${point.gdp.toFixed(1)}%; aprovação ${point.approval.toFixed(1)}%`} style={{display:'flex',height:'100%',flexDirection:'column',justifyContent:'end',alignItems:'center',gap:5}}><div style={{display:'flex',alignItems:'end',justifyContent:'center',gap:2,width:'100%',height:'100%'}}><div style={{width:'38%',height:`${Math.max(5,Math.min(100,(point.gdp+5)/13*100))}%`,background:'#20c980',borderRadius:'3px 3px 0 0',minHeight:4}}/><div style={{width:'38%',height:`${Math.max(5,Math.min(100,point.approval))}%`,background:'#5b9dff',borderRadius:'3px 3px 0 0',minHeight:4}}/></div><small style={{fontSize:10,color:'#91a8b8'}}>{point.month}</small></div>)}</div><div style={{display:'flex',gap:14,flexWrap:'wrap',fontSize:12,color:'#91a8b8',marginTop:8}}><span style={{color:'#20c980'}}>■ Crescimento anualizado do PIB (%)</span><span style={{color:'#5b9dff'}}>■ Aprovação (%)</span><span>Última aprovação: <b style={{color:'#edf4f8'}}>{economyHistory.at(-1).approval.toFixed(1)}%</b></span><span>Confiança empresarial: <b style={{color:'#edf4f8'}}>{economyHistory.at(-1).confidence.toFixed(1)}/100</b></span></div><h4>Economia mês a mês</h4><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}><thead><tr>{['Mês','PIB %','Resultado primário (R$ bi)','Inflação %','Dívida % PIB','Confiança','Aprovação'].map(x=><th key={x} style={{textAlign:'left',padding:9,borderBottom:'1px solid #344753',color:'#9eb2c0'}}>{x}</th>)}</tr></thead><tbody>{[...economyHistory].reverse().map(p=><tr key={p.month}>{[p.month,p.gdp.toFixed(2),p.primary.toFixed(1),p.inflation.toFixed(2),p.debt.toFixed(1),p.confidence.toFixed(1),p.approval.toFixed(1)].map((v,i)=><td key={i} style={{padding:9,borderBottom:'1px solid #1d2b35'}}>{v}</td>)}</tr>)}</tbody></table></div></>}
          </section>
          <section style={{border:'1px solid #263743',borderRadius:8,padding:16,background:'#0d141a'}}><h3 style={{marginTop:0}}>Últimos impactos registrados</h3>{economyEvents.length===0?<p style={{color:'#91a8b8'}}>Os impactos serão registrados ao fechar cada mês do mandato.</p>:economyEvents.slice(0,4).map((event,i)=><article key={`${event.month}-${i}`} style={{padding:'10px 0',borderBottom:'1px solid #1d2b35'}}><b>Mês {event.month} · {event.title}</b><p style={{margin:'5px 0',color:'#a9bac5'}}>{event.detail}</p><small style={{color:'#8197a6'}}>PIB: {event.growthDelta>=0?'+':''}{event.growthDelta.toFixed(2)} p.p. · Confiança: {event.confidenceDelta>=0?'+':''}{event.confidenceDelta.toFixed(2)} · Resultado primário: {event.fiscalDelta>=0?'+':''}{event.fiscalDelta.toFixed(1)} bi</small></article>)}</section>
        </div>:<p>Esta área reúne os assuntos de {mandateTab}. As decisões agora alteram indicadores e podem gerar consequências políticas mensais.</p>}</section>}
      </section>}
      {!playerWonElection&&tab==='palco'&&<>
        <div className="headline-card"><div className="eyebrow">REVISTA DA SEMANA · A CAPA DE SEGUNDA</div><span className="week-tag">SEMANA {week}</span><h2>{headline.toUpperCase()}</h2><p>O noticiário muda a agenda da campanha. Escolha como responder, avalie o impacto e acompanhe a reação nas pesquisas.</p><div className="headline-actions"><button onClick={()=>{setHeadline('A equipe cobra uma resposta do candidato');addLog('Resposta à imprensa','A equipe decidiu responder com uma declaração e um compromisso público.')}}>Preparar resposta</button><button onClick={()=>{setHeadline('A campanha muda a rota da semana');doAction('Reunião de equipe',statePick)}}>Reunir equipe</button><button onClick={()=>setModal('event')}>Ver opções do caso</button></div></div>
        <div className="staff-strip">{[['MARQUETEIRO',selectedAllies[0]?.name||'Equipe interna'],['COORDENADOR',selectedAllies[1]?.name||'A definir'],['TESOUREIRO',selectedAllies[2]?.name||'A definir'],['PORTA-VOZ',selectedAllies[3]?.name||'A definir']].map(([k,v])=><span key={k}><small>{k}:</small> {v}</span>)}</div>
        <div className="dashboard-grid"><div className="main-column">
          {activeEvent&&!electionResult&&<section className="feature-card"><div className="feature-art"><span className="eyebrow">ACONTECEU NA CAMPANHA · SEMANA {week}</span><h2>{activeEvent.title}</h2></div><div className="feature-content"><p>{activeEvent.body}</p><div className="choice-grid"><button onClick={()=>{const delta=(Math.random()*0.9-0.45);setSecurity(s=>Math.min(100,s+1));setPendingPollImpact(v=>Math.max(-3,Math.min(3,v+delta)));addLog('Resposta pública',`A campanha respondeu ao caso. O impacto de ${delta>=0?'+':''}${delta.toFixed(2).replace('.',',')} p.p. será contabilizado no fechamento semanal.`);setActiveEvent(null);}}><b>Responder publicamente</b><small>Explicar a posição e assumir responsabilidade; a reação pode ser positiva ou negativa.</small></button><button onClick={()=>{const delta=Math.random()*0.5-0.35;setPendingPollImpact(v=>Math.max(-3,Math.min(3,v+delta)));setSecurity(s=>Math.max(0,s-1));addLog('Apuração interna',`A campanha decidiu apurar antes de falar. Impacto simulado: ${delta.toFixed(2).replace('.',',')} p.p.`);setActiveEvent(null);}}><b>Apurar antes de responder</b><small>Evita precipitação, mas pode parecer demora.</small></button><button onClick={()=>{const delta=-(Math.random()*0.65+0.15);setPendingPollImpact(v=>Math.max(-3,Math.min(3,v+delta)));setSecurity(s=>Math.max(0,s-3));addLog('Resposta evasiva',`A campanha evitou os pontos centrais. Impacto simulado: ${delta.toFixed(2).replace('.',',')} p.p.`);setActiveEvent(null);}}><b>Evitar a pergunta</b><small>Reduz o desgaste imediato, mas pode custar confiança e votos.</small></button></div></div></section>}
          <section className="panel"><div className="panel-heading"><div><div className="eyebrow">PLANEJAMENTO</div><h2>A agenda da semana</h2></div><span className="counter">{actions}/3</span></div><div className="agenda-list"><div className="agenda-row"><div className="agenda-icon">⌖</div><div className="agenda-copy"><b>{lastAction}</b><small>Agenda de rua · custo e energia variam por ação</small></div><span className="status-pill">{actions>=3?'CONCLUÍDA':'PLANEJADA'}</span></div><div className="agenda-row"><div className="agenda-icon">◈</div><div className="agenda-copy"><b>Compromisso de campanha</b><small>Defina uma proposta pública para a semana</small></div><button className="tiny-button" onClick={()=>setModal('promise')}>Definir</button></div></div><div className="agenda-actions-head"><button className="primary" onClick={()=>setModal('actions')}>＋ Fazer ações</button><button className="secondary" onClick={restCampaign} disabled={actions>=3||energy>=100}>↻ Descansar (+28 energia)</button></div>{debateAvailable&&debateDoneWeek!==week&&<div className="debate-entry"><div><b>Debate presidencial ao vivo</b><small>O apresentador está aguardando. Entre para responder às perguntas e enfrentar a réplica do adversário.</small></div><button className="primary" onClick={openDebate}>Entrar no debate ↗</button></div>}{(debateWeeks.includes(week)||secondRoundDebateWeeks.includes(week))&&debateDoneWeek===week&&<p className="form-hint">Debate desta semana concluído. O efeito nas pesquisas será aplicado ao fechar a semana.</p>}<p className="form-hint">Ações realizadas: {actions}/3. As pesquisas só mudam ao fechar a semana. Debate presidencial: semanas 3, 7, 10 e 12. Acesse também a aba Debates no menu para entrar na transmissão.</p><div className="action-footer"><span>Energia {energy}/100 · Caixa R$ {cash.toFixed(1).replace('.',',')} mi · Impacto semanal pendente {pendingPollImpact>=0?'+':''}{pendingPollImpact.toFixed(2).replace('.',',')}</span><button onClick={advanceWeek}>Fechar semana →</button></div></section>
          <section className="panel"><div className="panel-heading"><div><div className="eyebrow">REPUTAÇÃO</div><h2>O que está acontecendo</h2></div><button className="tiny-button" onClick={()=>setTab('redes')}>Abrir redes ↗</button></div>{log.slice(0,3).map((l,i)=><div className="log-row" key={i}><span className="log-dot"/><div><b>{l.title}</b><p>{l.body}</p></div></div>)}</section>
        </div><aside className="side-column"><section className="poll-card"><div className="eyebrow">PESQUISA NACIONAL · SIMULADA</div><div className="poll-versus">{runoffTopTwo&&!playerQualifiedForRunoff?<div><strong>{runoffTopTwo[0]?.share.toFixed(1).replace('.',',')}%</strong><b>{runoffTopTwo[0]?.name}</b><small>{runoffTopTwo[0]?.party} · líder do primeiro turno</small></div>:<div><strong>{playerShare.toFixed(1).replace('.',',')}%</strong><b>{candidate}</b><small>{party} · sua candidatura</small></div>}<span>CONTRA</span><div className="opponent">{runoffTopTwo&&!playerQualifiedForRunoff?<><strong>{runoffTopTwo[1]?.share.toFixed(1).replace('.',',')}%</strong><b>{runoffTopTwo[1]?.name}</b><small>{runoffTopTwo[1]?.party} · segundo colocado</small></>:<><strong>{sortedPolls.find(p=>p.name!==candidate)?.share.toFixed(1).replace('.',',')||'—'}%</strong><b>{sortedPolls.find(p=>p.name!==candidate)?.name||'Adversário'}</b><small>{sortedPolls.find(p=>p.name!==candidate)?.party||'—'}</small></>}</div></div><div className="poll-note">Acompanhe a evolução simulada conforme decisões, eventos e agenda da campanha.</div><div className="poll-bottom"><span>Semana {week} · intenção de voto</span><button onClick={()=>setTab('pesquisas')}>Ver pesquisas ↗</button></div></section>
          <section className="panel race-panel"><div className="panel-heading"><h2>A corrida</h2><button className="text-button" onClick={()=>setTab('pesquisas')}>Ver tudo</button></div>{sortedPolls.slice(0,5).map((p,i)=><div className="race-row" key={p.name}><span className="rank">{i+1}º</span><CandidateAvatar name={p.name} color={p.color} userPhoto={photo} userName={candidate}/><div className="race-copy"><b>{p.name}</b><small>{p.party}</small><div className="mini-meter"><i style={{width:`${Math.min(100,p.share*2)}%`,background:p.color}}/></div></div><strong>{p.share.toFixed(1).replace('.',',')}%</strong></div>)}<p className="disclaimer">Candidatos públicos podem aparecer na simulação; percentuais são fictícios e não representam pesquisas reais.</p></section>
          <section className="resource-card"><div><div className="eyebrow">RECURSOS</div><h3>Campanha sob controle</h3></div><div className="resource-stats"><span><small>Energia</small><b>{energy}/100</b></span><span><small>Segurança</small><b>{Number(security).toFixed(1).replace('.',',')}/100</b></span><span><small>Caixa</small><b>R$ {cash.toFixed(1)} mi</b></span></div></section>
        </aside></div>
        {!playerWonElection&&electionResult&&<section className="panel page-panel election-result"><div className="eyebrow">RESULTADO ELEITORAL · SIMULAÇÃO</div><h2>{electionResult.secondRound?(electionResult.secondRoundDone?'Resultado do segundo turno':'Resultado do primeiro turno'):'Vitória no primeiro turno'}</h2><p>A votação é calculada separadamente das pesquisas e pode divergir delas. Os resultados são fictícios.</p><div className="poll-list">{(electionResult.secondRoundDone?electionResult.secondRoundResult:electionResult.firstRound.slice(0,5)).map((p,i)=><div className="poll-list-row" key={p.name}><div className="poll-list-name"><CandidateAvatar name={p.name} color={p.color} userPhoto={photo} userName={candidate}/><div><b>{i+1}. {p.name}</b><small>{p.party}</small></div></div><div className="poll-list-meter"><i style={{width:`${Math.min(100,p.share)}%`,background:p.color}}/></div><strong>{p.share.toFixed(1).replace('.',',')}%</strong></div>)}</div>{playerEliminatedAfterFirstRound&&<p><b>Campanha encerrada:</b> seu candidato não ficou entre os dois primeiros. O segundo turno será disputado somente por {electionResult.firstRound[0]?.name} e {electionResult.firstRound[1]?.name}. Você não pode realizar novas ações nesta eleição.</p>}{electionResult.secondRound&&!electionResult.secondRoundDone&&playerQualifiedForRunoff&&<p><b>Segundo turno:</b> {electionResult.firstRound[0].name} e {electionResult.firstRound[1].name} avançam. Ainda há {secondRoundWeeksRemaining} semana(s) de campanha; realize ações e avance cada semana antes da votação final.</p>}{electionResult.secondRoundDone&&<p><b>Presidente eleito na simulação:</b> {electionResult.secondRoundResult[0].name}.</p>}{playerWonElection&&<div className="modal-actions"><button className="primary" onClick={()=>setTab('mandato')}>{mandateStarted?'Ver meu governo':'Formar governo e escolher ministros'}</button></div>}</section>}
      </>}
      {!playerWonElection&&tab==='debates'&&<section className="panel page-panel"><div className="eyebrow">TRANSMISSÃO ELEITORAL</div><h2>Debates presidenciais</h2><p>Os debates acontecem em semanas definidas pela organização. Entre nesta aba para conferir a agenda e participar quando a transmissão estiver aberta.</p><div className="poll-list">{[...debateWeeks,...secondRoundDebateWeeks].map(w=><div className="agenda-row" key={w}><div className="agenda-icon">{w<week?'✓':w===week?'●':'◷'}</div><div className="agenda-copy"><b>Debate da semana {w}</b><small>{w<week?'Data passada':w===week?(debateDoneWeek===week?'Debate concluído':'Debate ao vivo — participação disponível'):'Agendado para uma semana futura'}</small></div>{w===week&&debateDoneWeek!==week&&debateAvailable&&<button className="primary" onClick={openDebate}>Entrar no debate ↗</button>}{w===week&&debateDoneWeek===week&&<span className="status-pill">CONCLUÍDO</span>}</div>)}</div>{debateAvailable&&debateDoneWeek!==week?<div className="debate-entry"><div><b>O debate desta semana está disponível</b><small>O apresentador fará a pergunta, você responderá e depois terá uma réplica ao adversário.</small></div><button className="primary" onClick={openDebate}>Entrar no debate ↗</button></div>:<p className="form-hint">{[...debateWeeks,...secondRoundDebateWeeks].find(w=>w>week)?`O próximo debate será na semana ${[...debateWeeks,...secondRoundDebateWeeks].find(w=>w>week)}.`:'A agenda de debates desta campanha foi concluída.'}</p>}</section>}
      {!playerWonElection&&tab==='mapa'&&renderMap()}
      {!playerWonElection&&tab==='equipe'&&<section className="panel page-panel"><div className="panel-heading"><div><div className="eyebrow">BASTIDORES</div><h2>Monte sua equipe</h2><p>Convide pessoas para funções da campanha. Rivalidades podem afetar a coesão.</p></div><span className="counter">{chosen.length} aliados</span></div><div className="ally-grid">{allyList.map(a=><article className={`ally-card ${chosen.includes(a.id)?'is-chosen':''}`} key={a.id}><div className="ally-top"><span className="candidate-avatar" style={{'--avatar':a.camp==='Direita'?'#387f63':a.camp==='Esquerda'?'#8d5cc2':'#4f7ca8'}}>{a.name.slice(0,1)}</span><span className="status-pill">{chosen.includes(a.id)?'NA EQUIPE':a.status.toUpperCase()}</span></div><h3>{a.name}</h3><p>{a.party} · {a.role}</p><div className="ally-meta"><span>Campo político</span><b>{a.camp}</b></div><div className="ally-meta"><span>Relação inicial</span><b>{a.relation}/100</b></div>{a.conflict.length>0&&<small className="conflict-note">Rivalidades: {a.conflict.join(', ')}</small>}<button className={chosen.includes(a.id)?'secondary full':'primary full'} onClick={()=>inviteAlly(a.id)}>{chosen.includes(a.id)?'Retirar da equipe':'Convidar para equipe'}</button></article>)}</div></section>}
      {!playerWonElection&&tab==='pesquisas'&&<section className="panel page-panel"><div className="panel-heading"><div><div className="eyebrow">TERMÔMETRO ELEITORAL</div><h2>Pesquisas</h2><p>{pollInstitute==='Geral'?'Média geral das pesquisas simuladas':pollInstitute}: cenário fictício da semana. Não representa levantamento publicado por esse instituto.</p></div><span className="status-pill">ATUALIZADO · SEMANA {week}</span></div><div className="filter-row"><div className="read-only-field"><b>Pesquisa presidencial</b><small>Intenção de voto para presidente da República</small></div><label>Instituto<select value={pollInstitute} onChange={e=>changePollInstitute(e.target.value)}><option>Geral</option><option>Datafolha</option><option>Quaest</option><option>PoderData</option><option>AtlasIntel</option><option>Paraná Pesquisas</option></select></label><label>Localidade<select value={researchState} onChange={e=>setResearchState(e.target.value)}><option>Brasil</option>{states.map(([uf,n])=><option key={uf}>{n}</option>)}</select></label><span className="status-pill">Próxima atualização: fechamento da semana</span></div><div className="poll-list">{visiblePollCandidates.filter(p=>(!runoffTopTwo||runoffTopTwo.some(q=>q.name===p.name))).sort((a,b)=>b.share-a.share).map((p,i)=><div className="poll-list-row" key={p.name}><div className="poll-list-name"><CandidateAvatar name={p.name} color={p.color} userPhoto={photo} userName={candidate}/><div><b>{p.name}</b><small>{p.party}</small></div></div><div className="poll-list-meter"><i style={{width:`${Math.min(100,p.share*2)}%`,background:p.color}}/></div><strong>{p.share.toFixed(1).replace('.',',')}%</strong></div>)}</div><p className="disclaimer">Esta é uma mecânica fictícia para testar decisões de campanha. Não use os valores como informação eleitoral do mundo real.</p></section>}
      {!playerWonElection&&tab==='redes'&&<section className="panel page-panel"><div className="eyebrow">COMUNICAÇÃO DIGITAL</div><h2>Redes sociais</h2><p>Publicações têm efeitos diferentes de acordo com o conteúdo, a clareza e o tom. Enviar qualquer texto não garante crescimento.</p><div className="social-layout"><div className="compose-card"><div className="compose-head"><CandidateAvatar name={candidate} color="#20c980" userPhoto={photo} userName={candidate}/><div><b>{candidate}</b><small>@campanha · publicação pública</small></div></div><textarea value={post} onChange={e=>setPost(e.target.value)} placeholder="Escreva uma proposta, explique uma ideia ou responda a um acontecimento…" maxLength={500}/><div className="compose-footer"><small>{post.length}/500 · Propostas específicas e tom respeitoso podem melhorar a recepção.</small><button className="primary" onClick={publishPost}>Publicar ↗</button></div>{postResult&&<div className="inline-feedback">{postResult}</div>}{socialReactions.length>0&&<div className="panel" style={{marginTop:16,padding:16}}><div className="eyebrow">REAÇÃO DA MÍDIA · SIMULAÇÃO FICTÍCIA</div><h3>Algumas figuras públicas reagiram</h3><p>O jogo escolhe apenas algumas figuras a cada publicação. Estas reações são fictícias e não representam declarações reais nem apoio dessas pessoas.</p>{socialReactions.map(r=><div className="tip-row" key={r.name}><span className="tip-icon neutral">◉</span><div><b>{r.name}</b><small>“{r.reaction}”</small></div></div>)}</div>}</div><div className="panel social-tips"><h3>O que afeta a repercussão?</h3><div className="tip-row"><span className="tip-icon positive">＋</span><div><b>Proposta concreta</b><small>Metas, prazos e explicação de como fazer.</small></div></div><div className="tip-row"><span className="tip-icon positive">＋</span><div><b>Clareza e evidências</b><small>Dados verificáveis e linguagem compreensível.</small></div></div><div className="tip-row"><span className="tip-icon negative">−</span><div><b>Insulto ou ameaça</b><small>Pode gerar reação negativa e reduzir confiança.</small></div></div><div className="tip-row"><span className="tip-icon neutral">≈</span><div><b>Mensagem vaga</b><small>Impacto pequeno quando não há proposta clara.</small></div></div></div></div></section>}
    </main>
    <footer><span><b>★ PALANQUE</b> · Protótipo de simulador presidencial</span><span>Modo demonstração · pesquisas fictícias · Semana {week}{electionResult?.secondRound&&!electionResult.secondRoundDone?'/16':'/13'}</span></footer>
    {modal&&<div className="modal-backdrop" style={{overflowY:'auto',alignItems:'flex-start',padding:'18px 12px',boxSizing:'border-box'}} onClick={()=>setModal('')}><div className="modal" style={{maxHeight:'calc(100vh - 36px)',overflowY:'auto',overscrollBehavior:'contain',boxSizing:'border-box',width:'min(100%, 760px)',margin:'auto'}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setModal('')}>×</button>{modal==='electionLost'?<><div className="eyebrow">RESULTADO ELEITORAL</div><h2>Você não foi eleito</h2><p>Sua candidatura não venceu esta eleição. O resultado foi registrado e a campanha está encerrada. Você pode conferir o desempenho ou começar uma nova disputa.</p><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Ver campanha</button><button className="primary" onClick={resetCampaign}>Tentar novamente</button></div></>:modal==='electionWon'?<><div className="eyebrow">RESULTADO ELEITORAL</div><h2>Parabéns, você foi eleito!</h2><p>Sua candidatura venceu a eleição na simulação. O resultado foi registrado.</p><div className="modal-actions"><button className="primary" onClick={()=>setModal('')}>Ver resultado</button><button className="secondary" onClick={resetCampaign}>Começar outra campanha</button></div></>:modal==='resetConfirm'?<><div className="eyebrow">RECOMEÇAR DO ZERO</div><h2>Resetar campanha?</h2><p>Isso apaga o progresso desta campanha — candidato, semana, pesquisas, equipe, ações e resultado eleitoral — e volta para a criação de um novo candidato. Sua conta e as outras contas deste navegador serão mantidas.</p><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Cancelar</button><button className="danger" onClick={resetCampaign}>Sim, resetar campanha</button></div></>:modal==='actions'?<><div className="eyebrow">AGENDA DA SEMANA</div><h2>Escolha uma ação</h2><p>Você pode realizar até três ações por semana. Os efeitos nas pesquisas serão calculados quando a semana for encerrada.</p><p className="form-hint">A lista abaixo é rolável. Caminhada, comício e palanque com governador são ações estaduais; podcast, live, entrevista e encontro com famoso são nacionais.</p><label>Estado da ação<select value={statePick} onChange={e=>setStatePick(e.target.value)}>{states.map(([uf,n])=><option key={uf} value={uf}>{capitals[uf]} — {n}</option>)}</select></label><div className="event-options">{[['Caminhada','8 energia','0,7 mi'],['Comício','14 energia','1,8 mi'],['Palanque com governador','10 energia','1,2 mi'],['Podcast','5 energia','0,4 mi'],['Live nas redes','4 energia','0,3 mi'],['Entrevista na imprensa','6 energia','0,5 mi'],['Evento de campanha','9 energia','1,0 mi'],['Encontro com famoso','6 energia','variável'],['Reunião diplomática','12 energia','2,0 mi']].map(([name,en,cost])=><button key={name} disabled={actions>=3} onClick={()=>{if(name==='Palanque com governador'){setModal('governor');return;}if(name==='Encontro com famoso'){setSelectedCelebrity('');setCelebrityMeetingResult('');setModal('celebrity');return;}if(name==='Reunião diplomática'){setMinister('');setModal('diplomacy');return;}doAction(name,['Caminhada','Comício'].includes(name)?statePick:null);setModal('');}}><b>{name}</b><small>{en} · R$ {cost}</small></button>)}<button disabled={!debateAvailable||debateDoneWeek===week} onClick={openDebate}><b>Debate presidencial {debateAvailable?'— HOJE NA AGENDA':`— semana ${[...debateWeeks,...secondRoundDebateWeeks].find(w=>w>week)||'encerrado'}`}</b><small>{debateAvailable?'Responda à pergunta e à réplica do adversário':'Os debates têm datas fixas e não podem ser escolhidos livremente.'}</small></button></div><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Fechar</button></div></>:modal==='debate'?<><div className="eyebrow">DEBATE PRESIDENCIAL · SEMANA {week}</div><h2>{debateStage===0?'A pergunta do apresentador':`Réplica: ${sortedPolls[0]?.name||'o adversário'}`}</h2>{debateStage===0?<><p>Apresentador: “Boa noite. Vamos começar com um tema importante para o país.”</p><h3>{debateQuestion?.topic||'Pergunta do apresentador'}</h3><p className="debate-question">“{debateQuestion?.q}”</p><p>Escolha sua resposta. Propostas concretas e respostas diretas tendem a funcionar melhor do que promessas vagas ou ataques pessoais.</p></>:<><p>Apresentador: “O candidato respondeu. Agora, o adversário tem direito a uma réplica.”</p><blockquote>{(runoffTopTwo?.find(p=>p.name!==candidate)?.name)||sortedPolls.find(p=>p.name!==candidate)?.name||'O adversário'}: “{debateReplica||replicaQuestions[0]}”</blockquote><p>Agora responda à réplica. Você pode esclarecer o plano, reconhecer limites e apresentar metas, ou desviar do assunto.</p></>}<label className="debate-write-label">Sua resposta<textarea rows={5} value={debateAnswer} onChange={e=>setDebateAnswer(e.target.value)} placeholder={debateStage===0?'Escreva sua resposta como se estivesse ao vivo. Apresente sua proposta, explique como funcionaria e quais resultados pretende alcançar…':'Responda à réplica do adversário. Defenda seu plano, reconheça limites se necessário e explique como vai colocá-lo em prática…'} maxLength={1200}/></label><p className="form-hint">{debateAnswer.length}/1200 caracteres · Não precisa escrever muito: seja claro, apresente uma ideia e explique como faria. Uma resposta curta e direta também pode pontuar bem.</p><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Sair</button><button className="primary" disabled={debateAnswer.trim().length<3} onClick={answerDebate}>{debateStage===0?'Responder ao apresentador':'Responder à réplica'}</button></div></>:modal==='debateResult'?<><div className="eyebrow">DEBATE ENCERRADO · SEMANA {week}</div><h2>{debateScore>=80?'Excelente debate!':debateScore>=60?'Bom debate!':debateScore>=40?'Debate razoável':'Você precisa melhorar'}</h2><div className="debate-grade" style={{fontSize:'2.4rem',fontWeight:800,margin:'12px 0'}}>{debateScore}<span style={{fontSize:'1rem',fontWeight:500}}>/100 pontos</span></div><p>Essa nota avalia suas duas respostas considerando clareza, proposta concreta, explicação e evasivas. A avaliação é automática por regras simples, não por uma IA que compreenda todo o contexto.</p><p>Apresentador: “Obrigado aos candidatos. O debate está encerrado. O público agora vai avaliar as propostas e o desempenho de cada participante.”</p><p>Seu resultado foi registrado. O efeito na intenção de voto será calculado quando você fechar a semana.</p><div className="modal-actions"><button className="primary" onClick={()=>setModal('')}>Voltar à campanha</button></div></>:modal==='celebrity'?<><div className="eyebrow">AGENDA PÚBLICA · SIMULAÇÃO</div><h2>Encontro com famoso</h2><p>Solicite um encontro com uma figura conhecida. A chance de aceitar é simulada e depende da visibilidade da campanha; não representa apoio real dessas pessoas.</p><label>Convidado<select value={selectedCelebrity} onChange={e=>setSelectedCelebrity(e.target.value)}><option value="">Escolha uma pessoa</option>{celebrityGuests.map(p=><option key={p.name} value={p.name}>{p.name} — {p.area}</option>)}</select></label>{selectedCelebrity&&<p className="form-hint">Custo estimado: R$ {celebrityGuests.find(p=>p.name===selectedCelebrity)?.cost.toFixed(1).replace('.',',')} mi · 6 de energia · consome uma ação da semana.</p>}{celebrityMeetingResult&&<div className="inline-feedback">{celebrityMeetingResult}</div>}<div className="modal-actions"><button className="secondary" onClick={()=>setModal('actions')}>Voltar</button><button className="primary" disabled={!selectedCelebrity||actions>=3} onClick={meetCelebrity}>Solicitar encontro</button></div></>:modal==='diplomacy'?<><div className="eyebrow">AGENDA INTERNACIONAL</div><h2>Reunião com liderança estrangeira</h2><p>Escolha o país para uma reunião diplomática simulada.</p><label>Representante<select value={minister} onChange={e=>setMinister(e.target.value)}><option value="">Selecione um representante</option><option>Presidente dos Estados Unidos</option><option>Presidente da Argentina</option><option>Presidente da França</option><option>Presidente da China</option><option>Presidente de Portugal</option></select></label><div className="modal-actions"><button className="secondary" onClick={()=>setModal('actions')}>Voltar</button><button className="primary" disabled={!minister||actions>=3} onClick={()=>{doAction('Reunião diplomática',statePick);addLog('Agenda internacional',`A campanha realizou uma reunião diplomática simulada com ${minister}.`);setModal('');}}>Realizar reunião</button></div></>:modal==='invite'||modal==='conflict'?<><div className="eyebrow">ARTICULAÇÃO POLÍTICA</div><h2>{modal==='conflict'?'Alerta de rivalidade':'Convite para a equipe'}</h2><p>{message}</p>{modal==='conflict'?<><label>Proposta para superar as diferenças<textarea rows={3} value={inviteProposal} onChange={e=>setInviteProposal(e.target.value)} placeholder="Explique o papel, os compromissos e por que vale a pena trabalhar junto…"/></label><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Voltar</button><button className="danger" onClick={()=>{setModal('invite');setMessage('A rivalidade aumenta a dificuldade. Agora finalize uma proposta concreta para tentar convencê-lo.')}}>Continuar negociação</button></div></>:<><label>Função proposta<select value={minister} onChange={e=>setMinister(e.target.value)}><option>Articulação política</option><option>Coordenação de campanha</option><option>Comunicação</option><option>Programa de governo</option><option>Palanques estaduais</option></select></label><label>Proposta concreta<textarea rows={4} value={inviteProposal} onChange={e=>setInviteProposal(e.target.value)} placeholder="Ex.: Quero que você coordene a comunicação digital, com autonomia para definir a estratégia semanal e metas de mobilização…"/></label><p className="form-hint">A chance depende da relação, da proximidade partidária e da proposta. Convites vagos têm menos chance de serem aceitos.</p><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Cancelar</button><button className="primary" onClick={confirmInvite}>Enviar proposta</button></div></>}</>:modal==='settings'?<><div className="eyebrow">CONFIGURAÇÕES DE PERFIL</div><h2>Seu político</h2><p>Personalize o nome público e o partido inicial da sua carreira.</p><label>Nome público<input value={candidate} onChange={e=>setCandidate(e.target.value)}/></label><label>Partido<div className="read-only-field">{party} — escolhido na criação do candidato</div></label><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Cancelar</button><button className="primary" onClick={saveSettings}>Salvar ajustes</button></div></>:modal==='governor'?<><div className="eyebrow">ARTICULAÇÃO ESTADUAL</div><h2>Com qual governador você vai se reunir?</h2><p>Escolha um estado e um governador. O encontro pode abrir portas, mas o apoio não é automático.</p><label>Estado<select value={statePick} onChange={e=>setStatePick(e.target.value)}>{states.map(([uf,n])=><option key={uf} value={uf}>{n}</option>)}</select></label><label>Governador<select value={minister} onChange={e=>setMinister(e.target.value)}><option value="">Escolher liderança</option><option>Tarcísio de Freitas — São Paulo</option><option>Eduardo Leite — Rio Grande do Sul</option><option>Ratinho Junior — Paraná</option><option>Romeu Zema — Minas Gerais</option><option>Ronaldo Caiado — Goiás</option><option>Jerônimo Rodrigues — Bahia</option><option>Cláudio Castro — Rio de Janeiro</option><option>Outro governador</option></select></label><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Cancelar</button><button className="primary" onClick={()=>{if(!minister){setMessage('Escolha um governador para registrar a reunião.');return;}doAction('Palanque com governador',statePick);addLog('Reunião solicitada',`A campanha pediu reunião com ${minister}. O apoio ainda depende de negociação.`);setModal('');}}>Solicitar reunião</button></div></>:modal==='promise'?<><div className="eyebrow">AGENDA DA SEMANA</div><h2>Compromisso de campanha</h2><p>Escolha uma área e registre uma promessa pública.</p><label>Área<select><option>Saúde</option><option>Educação</option><option>Segurança</option><option>Economia e emprego</option><option>Infraestrutura</option><option>Meio ambiente</option></select></label><label>Compromisso<input placeholder="Ex.: publicar metas e prazos em 30 dias"/></label><div className="modal-actions"><button className="secondary" onClick={()=>setModal('')}>Cancelar</button><button className="primary" onClick={()=>{addLog('Compromisso registrado','A campanha registrou um compromisso público que poderá ser cobrado em eventos futuros.');setModal('');}}>Registrar compromisso</button></div></>:modal==='event'?<><div className="eyebrow">DECISÃO DE CAMPANHA</div><h2>Como responder ao noticiário?</h2><p>Uma resposta coerente pode limitar danos; negar sem explicar pode aumentar a desconfiança.</p><div className="event-options"><button onClick={()=>{setSecurity(s=>Math.min(100,s+2));addLog('Resposta transparente','A campanha apresentou fatos verificáveis e anunciou uma apuração interna.');setModal('')}}><b>Responder com transparência</b><small>Apresentar fatos, prazos e uma apuração.</small></button><button onClick={()=>{setSecurity(s=>Math.max(0,s-4));setPlayerShare(v=>Math.max(4,v-.25));addLog('Resposta evasiva','A campanha evitou responder aos pontos centrais e a repercussão foi negativa.');setModal('')}}><b>Evitar a pergunta</b><small>Pode alimentar dúvidas e gerar novas cobranças.</small></button><button onClick={()=>{setSecurity(s=>Math.max(0,s-6));setPlayerShare(v=>Math.max(4,v-.45));addLog('Ataque pessoal','A campanha atacou críticos em vez de responder ao assunto.');setModal('')}}><b>Atacar os críticos</b><small>Risco de ampliar o desgaste público.</small></button></div></>:modal==='menu'?<><div className="eyebrow">NAVEGAÇÃO</div><h2>Espaço de trabalho</h2><div className="menu-list">{(playerWonElection?[['mandato','♜','Mandato']]:tabs).map(([id,icon,label])=><button key={id} onClick={()=>{setTab(id);setModal('')}}>{icon} {label} <span>→</span></button>)}</div></>:<><div className="eyebrow">FEEDBACK</div><h2>Enviar sugestão</h2><p>Este espaço fica disponível para anotar melhorias do protótipo.</p><label>Sugestão<textarea placeholder="O que você quer melhorar?"/></label><div className="modal-actions"><button className="primary" onClick={()=>setModal('')}>Fechar</button></div></>}</div></div>}
  </div>
}
export default App;
