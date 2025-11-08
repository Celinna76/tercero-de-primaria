import React from 'react';
import { pageContent } from './content';

// --- MODAL COMPONENT ---
interface ModalContent {
  title: string;
  message: string;
  type: 'healthy' | 'unhealthy' | 'fun-fact';
  icon: React.ReactNode;
}

interface FoodModalProps {
  content: ModalContent;
  onClose: () => void;
}

const FoodModal: React.FC<FoodModalProps> = ({ content, onClose }) => {
  const getColors = () => {
    switch (content.type) {
      case 'healthy':
        return { bg: 'bg-green-100 border-green-500', button: 'bg-green-500 hover:bg-green-600' };
      case 'unhealthy':
        return { bg: 'bg-red-100 border-red-500', button: 'bg-red-500 hover:bg-red-600' };
      case 'fun-fact':
        return { bg: 'bg-yellow-100 border-yellow-500', button: 'bg-yellow-500 hover:bg-yellow-600' };
      default:
        return { bg: 'bg-gray-100 border-gray-500', button: 'bg-gray-500 hover:bg-gray-600' };
    }
  };

  const { bg, button } = getColors();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`relative rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all duration-300 scale-95 hover:scale-100 ${bg} border-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center">{content.icon}</div>
        <h3 className="text-3xl font-black text-gray-800 mb-2">{content.title}</h3>
        <p className="text-lg text-gray-700 mb-6">{content.message}</p>
        <button 
          onClick={onClose}
          className={`px-6 py-2 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform ${button}`}
        >
          ¡Entendido!
        </button>
      </div>
    </div>
  );
};

// Helper component for sticker-like graphics
interface StickerProps {
  children: React.ReactNode;
  className?: string;
}
const Sticker: React.FC<StickerProps> = ({ children, className }) => (
  <div className={`transform transition-transform duration-300 hover:scale-110 hover:rotate-3 drop-shadow-lg ${className}`}>
    {children}
  </div>
);

// Helper component for section titles and content
interface SectionProps {
  title: string;
  children: React.ReactNode;
  titleColor?: string;
}
const Section: React.FC<SectionProps> = ({ title, children, titleColor = 'text-blue-600' }) => (
  <section className="mb-10">
    <h2 className={`text-3xl md:text-4xl font-extrabold ${titleColor} mb-4 pb-2 border-b-4 border-yellow-400 inline-block`}>{title}</h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

interface FoodTableProps {
  title: string;
  headers: string[];
  data: Record<string, string>[];
}
const FoodTable: React.FC<FoodTableProps> = ({ title, headers, data }) => (
  <div className="my-8">
    <h3 className="text-2xl font-bold text-center text-teal-700 mb-4">{title}</h3>
    
    {/* Desktop Table */}
    <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full text-left">
        <thead className="bg-teal-500 text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-4 font-bold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-teal-50' : 'bg-white'}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4 border-t border-gray-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Card List */}
    <div className="block md:hidden space-y-4">
        {data.map((row, rowIndex) => (
            <div key={rowIndex} className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-teal-500">
                {headers.map((header, headerIndex) => (
                    <div key={headerIndex} className="mb-2">
                        <p className="font-bold text-teal-700">{header}</p>
                        <p className="text-gray-600">{Object.values(row)[headerIndex]}</p>
                    </div>
                ))}
            </div>
        ))}
    </div>
  </div>
);

const FoodPyramid = () => (
    <div className="my-12 w-full max-w-lg mx-auto">
      <img src="/piramide.png" alt="Pirámide alimenticia" className="w-full h-auto object-contain drop-shadow-lg" />
    </div>
);

// --- FUN FACTS SECTION ---
interface FunFactCardProps {
    icon: React.ReactNode;
    text: string;
    bgColor: string;
}
const FunFactCard: React.FC<FunFactCardProps> = ({ icon, text, bgColor }) => (
    <div className={`p-6 rounded-2xl shadow-lg flex items-center gap-4 ${bgColor} border-4 border-white transform hover:-translate-y-2 transition-transform duration-300 h-full`}>
        <div className="flex-shrink-0">{icon}</div>
        <p className="font-bold text-gray-800 text-base">{text}</p>
    </div>
);

// --- PDF ICON SVG ---
const PdfIcon = () => (
  <svg className="w-12 h-12 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

// --- RESOURCE CARD COMPONENT ---
interface ResourceCardProps {
    title: string;
    description: string;
    link: string;
    bgColor: string;
}
const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link, bgColor }) => (
    <div className={`p-6 rounded-2xl shadow-lg flex flex-col gap-4 ${bgColor} border-4 border-white transform hover:-translate-y-2 transition-transform duration-300 h-full`}>
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0"><PdfIcon /></div>
            <h3 className="font-extrabold text-xl text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-700 flex-grow">{description}</p>
        <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto self-start bg-white text-gray-800 font-bold py-2 px-5 rounded-full shadow-md hover:bg-gray-200 transition-colors border-2 border-gray-300"
        >
            Ver PDF
        </a>
    </div>
);


// --- FOOTER COMPONENT ---
const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto text-center py-6 mt-8 text-gray-600 border-t border-gray-300/50">
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
        <div className="font-semibold text-sm md:text-base mb-2 md:mb-0">
            <p>{pageContent.footer.copyrightLine1}</p>
            <p>{pageContent.footer.copyrightLine2}</p>
        </div>
        <a 
          href={pageContent.footer.facebookLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Facebook de la Escuela de Líderes"
          className="text-blue-600 hover:text-blue-800 transition-colors transform hover:scale-110"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [modalContent, setModalContent] = React.useState<ModalContent | null>(null);
  
  return (
    <div className="bg-sky-50 min-h-screen font-nunito text-gray-800 p-4 md:p-8 flex flex-col items-center">
      {modalContent && <FoodModal content={modalContent} onClose={() => setModalContent(null)} />}
      
      <img src="/logo.png" alt="Logo del Colegio Loreto" className="mb-8 h-24 w-24 md:h-32 md:w-32 object-contain" />

      <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-sky-100 to-blue-100 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-12 relative overflow-hidden border-4 border-white">
        
        <header className="text-center mb-12 border-b-8 border-double border-yellow-400 pb-8 relative">
          <h1 className="text-4xl md:text-6xl font-black text-amber-900 drop-shadow-sm flex flex-col items-center">
            {pageContent.header.title.map(line => <span key={line}>{line}</span>)}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-blue-600 mt-4">{pageContent.header.subtitle}</p>
          
          <div className="mt-8 text-gray-600 text-center">
            <p className="font-bold text-lg">Participantes:</p>
            {pageContent.header.participants.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <p className="mt-2"><span className="font-bold">Curso:</span> {pageContent.header.course}</p>
            <p className="mt-4 text-sm font-bold">{pageContent.header.locationAndDate}</p>
          </div>
        </header>

        <main className="space-y-12">
          <Section title={pageContent.introduction.title}>
            <p>{pageContent.introduction.text}</p>
          </Section>

          <Section title={pageContent.development.title}>
            <h3 className="text-2xl font-bold text-green-700 mb-3 mt-4">{pageContent.development.pyramid.title}</h3>
            <p>{pageContent.development.pyramid.text}</p>
            <FoodPyramid />

            <h3 className="text-2xl font-bold text-green-700 mb-3 mt-8">{pageContent.development.healthy.title}</h3>
            <p>{pageContent.development.healthy.text}</p>
             <div className="flex justify-center my-8 flex-wrap gap-4">
                {pageContent.foodItems.healthy.map(item => {
                  const imageNode = <img src={`/${item.id}.png`} alt={item.title} className="w-24 h-24 object-contain" />;
                  return (
                    <button key={item.id} onClick={() => setModalContent({ title: item.title, message: item.message, type: 'healthy', icon: imageNode })} className="cursor-pointer animate-blink hover:animate-none">
                      <Sticker>{imageNode}</Sticker>
                    </button>
                  );
                })}
            </div>

            <h3 className="text-2xl font-bold text-red-600 mb-3 mt-8">{pageContent.development.unhealthy.title}</h3>
            <p>{pageContent.development.unhealthy.text}</p>
            <div className="flex justify-center my-8 flex-wrap gap-4">
                {pageContent.foodItems.unhealthy.map(item => {
                  const imageNode = <img src={`/${item.id}.png`} alt={item.title} className="w-24 h-24 object-contain" />;
                  return (
                    <button key={item.id} onClick={() => setModalContent({ title: item.title, message: item.message, type: 'unhealthy', icon: imageNode })} className="cursor-pointer animate-blink hover:animate-none">
                      <Sticker>{imageNode}</Sticker>
                    </button>
                  );
                })}
            </div>

            <h3 className="text-2xl font-bold text-green-700 mb-3 mt-8">{pageContent.development.balance.title}</h3>
            <p>{pageContent.development.balance.text}</p>
          </Section>

          <Section title={pageContent.conclusion.title}>
            <p>{pageContent.conclusion.text}</p>
          </Section>
          
          <Section title={pageContent.funFacts.title} titleColor="text-orange-500">
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {pageContent.funFacts.facts.map(fact => {
                const imageNode = <img src={`/${fact.iconId}.png`} alt={fact.text} className="w-20 h-20 object-contain" />;
                return (
                  <button 
                    key={fact.id} 
                    className="text-left w-full h-full"
                    onClick={() => setModalContent({
                      title: fact.modalTitle,
                      message: fact.modalMessage,
                      type: 'fun-fact',
                      icon: imageNode
                    })}
                  >
                    <FunFactCard icon={imageNode} text={fact.text} bgColor={fact.bgColor} />
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title={pageContent.bibliography.title}>
            <ul className="list-disc list-inside">
              {pageContent.bibliography.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </Section>
          
          <Section title={pageContent.annexes.title}>
            <FoodTable title={pageContent.annexes.healthyTable.title} headers={pageContent.annexes.healthyTable.headers} data={pageContent.annexes.healthyTable.data} />
            <FoodTable title={pageContent.annexes.unhealthyTable.title} headers={pageContent.annexes.unhealthyTable.headers} data={pageContent.annexes.unhealthyTable.data} />
          </section>

          <Section title={pageContent.additionalResources.title} titleColor="text-purple-600">
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {pageContent.additionalResources.resources.map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  link={`/${resource.fileName}`}
                  bgColor={resource.bgColor}
                />
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600 italic">
              Nota: Al hacer clic, los archivos se abrirán en una nueva pestaña de tu navegador.
            </p>
          </Section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
