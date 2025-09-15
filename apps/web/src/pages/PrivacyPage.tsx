import { useNavigate } from "react-router-dom";

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-300 to-sky-200">
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Card bianca */}
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-3xl overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
            Informativa sulla Privacy
          </h1>

          <div className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed">                   
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Informazioni relative alla Privacy del sito.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">In questa sezione sono contenute le informazioni relative alle modalità di gestione di FinSpot, di proprietà di Alma Mater Studiorum - Università di Bologna, in riferimento al trattamento dei dati degli utenti del sito stesso.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">La presente informativa ha valore anche ai fini dell'articolo 13 del Regolamento (UE) n. 2016/679, relativo alla protezione delle persone fisiche con riguardo al trattamento dei dati personali nonché alla libera circolazione di tali dati, per i soggetti che interagiscono con FinSpot.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">L'informativa è resa solo per FinSpot e non anche per altri siti web eventualmente consultati dall'utente tramite link in esso contenuti.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Scopo del presente documento è fornire indicazioni circa le modalità, i tempi e la natura delle informazioni che i titolari del trattamento devono fornire agli utenti al momento della connessione alle pagine web di FinSpot, indipendentemente dagli scopi del collegamento stesso, secondo la legislazione Italiana ed Europea.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">L'informativa può subire modifiche a causa dell'introduzione di nuove norme al riguardo, si invita pertanto l'utente a controllare periodicamente la presente pagina.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Se l'utente ha meno di quattordici anni, ai sensi dell'art.8, c.1 regolamento (UE) 2016/679, e dell'Art. 2 - Quinquies del D.Lgs 196/2003, così come modificato dal D.Lgs 181/18, dovrà legittimare il suo consenso attraverso l'autorizzazione dei genitori o di chi ne fa le veci.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Titolare del trattamento.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed"> Il titolare del trattamento è la persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali. Si occupa anche dei profili sulla sicurezza.</p>    
                    </li>
                    <li>
                        <p className="leading-relaxed">Relativamente al presente sito web il titolare del trattamento è: Alma Mater Studiorum - Università di Bologna, e per ogni chiarimento o esercizio dei diritti dell'utente potrà contattarlo al seguente indirizzo mail: assistenza.cesia@unibo.it</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Luogo trattamento dati.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">Il trattamento dei dati generato dall'utilizzo di FinSpot avviene presso Alma Mater Studiorum - Università di Bologna.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">In caso di necessità, i dati connessi al servizio newsletter possono essere trattati dal responsabile del trattamento o soggetti da esso incaricati a tal fine presso la relativa sede.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Base giuridica del trattamento.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">Il trattamento dei dati personali da parte di FinSpot si basa sul consenso ai sensi dell'art. 6, par. 1, lett. a) del Regolamento UE 2016/679 – espresso dall'utente mediante la navigazione su questo sito web e la sua consultazione, così accettando la presente informativa.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed"> Il consenso è facoltativo e può essere revocato in qualsiasi momento mediante richiesta inviata a mezzo email a assistenza.cesia@unibo.it precisando che, in tal caso, in assenza di consenso non potranno essere erogati alcuni servizi e la navigazione sul sito web potrebbe essere compromessa.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Cookies.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">In questa sezione viene descritto in che modo questo Sito utilizza i cookie e tecnologie similari. L'utilizzo dei cookie avviene nel rispetto della relativa normativa europea (direttiva 2009/136/CE ha modificato la direttiva 2002/58/CE "E Privacy) e nazionale (Provvedimento Garante per la protezione dei dati personali dell'8 maggio 2014 e successivi chiarimenti nonché Linee Guida cookie e altri strumenti di tracciamento del 10 giugno 2021 n.231).</p>    
                    </li>
                    <li>
                        <p className="leading-relaxed">Il sito utilizza esclusivamente cookies tecnici e non di tipo analitico o di profilazione. I primi dei quali non richiedono l'accettazione dei tali.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Tipologia di trattamento dati.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">Il trattamento dei dati personali è necessario per il perseguimento del legittimo interesse del titolare del trattamento per finalità di fornire informazioni circa l'attività di FinSpot ai sensi dell'art. 6, par. 1, lett. f) del Regolamento UE 2016/679, nel rispetto di quanto previsto dal medesimo Regolamento.</p>    
                    </li>
                    <li>
                        <p className="leading-relaxed"> Il presente sito fa uso di Log Files nei quali vengono conservate informazioni raccolte in maniera automatizzata durante le visite degli utenti. Le informazioni raccolte potrebbero essere le seguenti:</p>
                        <ul className="list-disc list-outside space-y-1 text-gray-700 ml-4">
                            <li>
                                <p className="leading-relaxed">indirizzo internet protocol (IP);</p>
                            </li>
                            <li>
                                <p className="leading-relaxed">tipo di browser e parametri del dispositivo usato per connettersi al sito;</p>
                            </li>
                            <li>
                                <p className="leading-relaxed">nome dell'internet service provider (ISP)</p>
                            </li>
                            <li>
                                <p className="leading-relaxed">data e orario di visita;</p>
                            </li>
                            <li>
                                <p className="leading-relaxed">pagina web di provenienza del visitatore (referral) e di uscita;</p>
                            </li>
                            <li>
                                <p className="leading-relaxed">eventualmente il numero di click.</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p className="leading-relaxed">Le suddette informazioni sono trattate in forma automatizzata e raccolte in forma esclusivamente aggregata al fine di verificare il corretto funzionamento del sito, e per motivi di sicurezza. Tali informazioni saranno trattate in base ai legittimi interessi del titolare.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed"> A fini di sicurezza (filtri antispam, firewall, rilevazione virus), i dati registrati automaticamente possono eventualmente comprendere anche dati personali come l'indirizzo Ip, che potrebbe essere utilizzato, conformemente alle leggi vigenti in materia, al fine di bloccare tentativi di danneggiamento al sito medesimo o di recare danno ad altri utenti, o comunque attività dannose o costituenti reato. Tali dati non sono mai utilizzati per l'identificazione o la profilazione dell'utente, ma solo a fini di tutela del sito e dei suoi utenti, tali informazioni saranno trattate in base ai legittimi interessi del titolare.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Dati forniti dall'utente.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">Qualora il sito consenta l'inserimento di commenti, oppure in caso di specifici servizi richiesti dall'utente, ivi compresi la possibilità di inviare il Curriculum Vitae per un eventuale rapporto lavorativo, il sito rileva automaticamente e registra alcuni dati identificativi dell'utente, compreso l'indirizzo mail. Tali dati si intendono volontariamente forniti dall'utente al momento della richiesta di erogazione del servizio.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed"> Inserendo un commento o altra informazione l'utente accetta espressamente l'informativa privacy. I dati ricevuti verranno utilizzati esclusivamente per l'erogazione del servizio richiesto e per il solo tempo necessario per la fornitura del servizio.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Le informazioni che gli utenti del sito riterranno di rendere pubbliche tramite i servizi e gli strumenti messi a disposizione degli stessi, sono fornite dall'utente consapevolmente e volontariamente, esentando il presente sito da qualsiasi responsabilità in merito ad eventuali violazioni delle leggi. Spetta all'utente verificare di avere i permessi per l'immissione di dati personali di terzi o di contenuti tutelati dalle norme nazionali ed internazionali.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed"> L'invio facoltativo, esplicito e volontario di posta elettronica agli indirizzi indicati su questo sito comporta la successiva acquisizione dell'indirizzo del mittente, necessario per rispondere alle richieste, nonché degli eventuali altri dati personali inseriti nella missiva.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed"> Specifiche informative di sintesi verranno progressivamente riportate o visualizzate nelle pagine del sito predisposte per particolari servizi a richiesta.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Finalità del trattamento dati.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">I dati raccolti dal sito durante il suo funzionamento sono utilizzati esclusivamente per le finalità sopra indicate e conservati per il tempo strettamente necessario a svolgere le attività precisate, e comunque non oltre 5 anni.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Conservazione Dati.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">Conformemente a quanto prescritto dall'art. 5.1(c) del Regolamento, i sistemi informativi e i programmi informatici utilizzati da FinSpot sono configurati in modo da ridurre al minimo l'uso di dati personali e identificativi; tali dati saranno trattati solo nella misura necessaria per il conseguimento delle finalità indicate nella presente Policy.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed"> I dati verranno conservati per il periodo di tempo strettamente necessario al conseguimento delle finalità in concreto perseguite e, in ogni caso, il criterio utilizzato per determinare il periodo di conservazione è improntato al rispetto dei termini consentiti dalle leggi applicabili e dai principi di minimizzazione del trattamento e limitazione della conservazione.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed"> I dati rilevati dal sito non saranno forniti mai a terzi, a meno che non si tratti di legittima richiesta da parte dell'autorità giudiziaria e nei soli casi previsti dalla legge.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">I dati utilizzati a fini di sicurezza (blocco tentativi di danneggiamento del sito) sono conservati per il tempo strettamente necessario al raggiungimento del fine anteriormente indicato.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Diritti dell'utente.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed"> Viene garantito all'utente il rispetto dei suoi diritti nell'ambito della protezione dei dati personali. In linea con quanto ripreso e affermato dal GDPR, in relazione al trattamento dei propri dati personali, l'utente ha diritto di chiedere al Titolare:</p>
                        <ul className="list-disc list-outside space-y-1 text-gray-700 ml-4">
                            <li>
                                <p className="leading-relaxed"><strong className="font-semibold text-gray-900">L'accesso: </strong>l'utente può chiedere conferma che sia o meno in essere un trattamento di dati che lo riguarda, oltre a maggiori chiarimenti circa le informazioni di cui alla presente informativa;</p>
                            </li>
                            <li>
                                <p className="leading-relaxed"><strong className="font-semibold text-gray-900">La rettifica: </strong>può chiedere di rettificare o integrare i dati che ha fornito, qualora inesatti o incompleti;</p>
                            </li>
                            <li>
                                <p className="leading-relaxed"><strong className="font-semibold text-gray-900">La cancellazione: </strong>può chiedere che i suoi dati vengano cancellati, qualora non siano più necessari alle nostre finalità, in caso di revoca del consenso o opposizione al trattamento, in caso di trattamento illecito, ovvero sussista un obbligo legale di cancellazione o si riferiscano a soggetti minori di anni quattordici;</p>
                            </li>
                            <li>
                                <p className="leading-relaxed"><strong className="font-semibold text-gray-900">La limitazione: </strong>può chiedere che i suoi dati siano trattati solo ai fini della conservazione, con esclusioni di altri trattamenti, per il periodo necessario alla rettifica dei suoi dati, in caso di trattamento illecito per il quale si opponga alla cancellazione, qualora lei debba esercitare i suoi diritti in sede giudiziaria e i dati conservati dal Titolare le possono essere utili e, infine, in caso di opposizione al trattamento e sia in corso una verifica sulla prevalenza dei motivi legittimi del Titolare rispetto ai suoi.</p>
                            </li>
                            <li>
                                <p className="leading-relaxed"><strong className="font-semibold text-gray-900">L'opposizione: </strong>può opporsi in qualunque momento al trattamento dei suoi dati, salvo che vi siano motivi legittimi del Titolare per procedere al trattamento che prevalgano sui suoi, per esempio per l'esercizio o la propria difesa in sede giudiziaria.</p>
                            </li>
                            <li>
                                <p className="leading-relaxed"><strong className="font-semibold text-gray-900">La portabilità: </strong>può chiedere di ricevere i suoi dati, o di farli trasmettere ad altro titolare da lei indicato, in un formato strutturato, di uso comune e leggibile da dispositivo automatico.</p>
                            </li>
                            <li>
                                <p className="leading-relaxed"><strong className="font-semibold text-gray-900">La revoca: </strong>può revocare il suo consenso all'utilizzo di cookie (Cookie Policy) in qualsiasi momento, poiché in questo caso costituisca la base del trattamento. La revoca del consenso comunque non pregiudica la liceità del trattamento basata sul consenso svolto prima della revoca stessa.</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p className="leading-relaxed">In qualsiasi momento l'utente può chiedere di esercitare i suddetti diritti a FinSpot rivolgendosi all'indirizzo mail: assistenza.cesia@unibo.it</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Inoltre, l'utente ha diritto di proporre reclamo nei confronti dell'Autorità di controllo italiana: "Garante per la Protezione dei Dati Personali" nel caso in cui ritenga che i suoi diritti siano stati violati da FinSpot o nel caso in cui non ritenga soddisfacente la risposta di FinSpot alle sue richieste.</p>
                    </li>
                </ol>
            </section>
            <section>
                <header>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                        Modifiche al presente documento.
                    </h2>
                </header>
                <ol className="list-decimal list-outside ml-6 space-y-2 text-gray-700">
                    <li>
                        <p className="leading-relaxed">Il presente documento, che costituisce la privacy policy di questo sito, è pubblicato all'indirizzo: https://isi-seawatch.csr.unibo.it/Sito/sito/pages/privacy.php</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Esso può essere soggetto a modifiche o aggiornamenti. Si invitano gli utenti a consultare periodicamente la presente pagina per essere sempre aggiornati sulle ultime novità legislative.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Le versioni precedenti del documento saranno comunque consultabili a questa pagina.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Scopo del presente documento è fornire indicazioni circa le modalità, i tempi e la natura delle informazioni che i titolari del trattamento devono fornire agli utenti al momento della connessione alle pagine web di FinSpot, indipendentemente dagli scopi del collegamento stesso, secondo la legislazione Italiana ed Europea.</p>
                    </li>
                    <li>
                        <p className="leading-relaxed">Il documento è stato aggiornato in data 29/12/2022 per essere conforme alle disposizioni normative in materia, ed in particolare in conformità al Regolamento (UE) 2016/679.</p>
                    </li>
                </ol>
            </section>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Torna indietro
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-gray-700 text-xs text-center">
        <p className="leading-relaxed">
          © 2024 Copyright:{" "}
          <a
            href="https://isi-finspot.csr.unibo.it"
            className="underline hover:text-blue-600"
          >
            isi-seawatch.csr.unibo.it
          </a>
        </p>
      </footer>
    </div>
  );
}
