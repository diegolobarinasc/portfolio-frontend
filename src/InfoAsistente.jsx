import arquitectura_asistente from "./assets/arquitectura_asistente.svg";
 
export default function InfoAsistente() {
  return (
    <div className="div-main">
      <h1 className="heading">Arquitectura y decisiones técnicas sobre el asistente</h1>
      <div className="text-block-largo">
        El asistente incluido en esta web está construido sobre una arquitectura cliente-servidor de dos capas. Cuando el usuario escribe una pregunta, el frontend desarrollado en React la envía junto con el historial reciente de la conversación a un backend construido con FastAPI en Python.
        <br></br><br></br>
        <img src={arquitectura_asistente} alt="Arquitectura del asistente" className="image-float" />
        El backend realiza dos consultas al modelo de lenguaje Llama 3.3 70B, servido a través de HuggingFace Router. La primera identifica de qué tipo es la pregunta. La segunda genera la respuesta utilizando el contexto adecuado — el CV, información sobre el propio asistente o sobre esta web, según corresponda.
        <br></br><br></br>
        Para identificar la intención del usuario se evaluó primero un sistema de embeddings, que clasifica preguntas por similitud semántica con ejemplos predefinidos. Sin embargo, las temáticas de este asistente comparten vocabulario con demasiada frecuencia — preguntas sobre el candidato y sobre el propio asistente usan palabras similares en contextos distintos — lo que generaba clasificaciones incorrectas.
        <br></br><br></br>
        Además, con un número reducido de intenciones definidas, mantener un volumen de ejemplos suficiente para que el sistema fuera robusto no resultaba práctico. Por eso se optó por usar el propio LLM como clasificador: entiende el significado completo de la pregunta sin necesidad de ejemplos previos, con menor mantenimiento y mejor resultado.
        <br></br><br></br>
        Todo el comportamiento del asistente está definido en archivos de configuración YAML y JSON externos al código, lo que permite modificarlo sin tocar el backend.
      </div>
        
    </div>
  );
}