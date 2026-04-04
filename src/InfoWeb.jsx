import arquitectura_web from "./assets/arquitectura_web.svg";
 
export default function InfoAsistente() {
  return (
    <div className="div-main">
      <h1 className="heading">Arquitectura y decisiones técnicas sobre la web</h1>
      <div className="text-block-largo">
        Esta web está construida como una Single Page Application (SPA) usando React como biblioteca de interfaz de usuario y Vite como herramienta de desarrollo y empaquetado. El navegador carga una única página HTML inicial y React se encarga de gestionar el contenido de forma dinámica, mostrando el componente correspondiente a cada URL sin recargar la página.
        <br></br><br></br>
        <img src={arquitectura_web} alt="Arquitectura de la web" className="image-float" />
        La navegación entre secciones se gestiona con React Router, que intercepta los cambios de URL y renderiza el componente adecuado. Todas las páginas comparten una componente compartido que contiene la barra de navegación y el asistente, de forma que añadir una nueva sección consiste únicamente en crear un nuevo componente React y registrar su ruta.
        <br></br><br></br>
        El asistente está integrado como un componente más de la interfaz. Cuando el usuario envía un mensaje, el componente construye un objeto JSON con la pregunta y el historial reciente de la conversación, y lo envía mediante una petición HTTP al backend. La respuesta llega también en formato JSON y se muestra en la interfaz. El estado de la conversación se mantiene en memoria durante la sesión.
        <br></br><br></br>
        Los estilos están definidos en CSS plano, sin frameworks de diseño, con variables de color y clases reutilizables que dan coherencia visual a toda la web.
      </div>
        
    </div>
  );
}