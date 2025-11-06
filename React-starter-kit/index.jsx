const { useState, useEffect } = React;

export const App = () => {
  const [advice, setAdvice] = useState({});
  const { id, quotation } = advice;

  const fetchAdvice = async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setAdvice({
        id: data.slip.id,
        quotation: data.slip.advice,
      });
    } catch (err) {
      console.error("No data has been fetched...", err);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const getNewAdvice = () => {
    fetchAdvice();
  };

  return (
    <main className="advice-generator-card">
      <section className="advice-generator-card__text">
        <h1 className="advice-generator-card__text-title">Advice #{id}</h1>
        <q className="advice-generator-card__text-quotation">{quotation}</q>
      </section>

      <img
        src="./assets/images/pattern-divider-mobile.svg"
        alt=""
        width="295"
        height="16"
        className="advice-generator-card__divider"
      />
      
      <button
        className="advice-generator-card__button"
        onClick={getNewAdvice}
      >
        <img
          src="./assets/images/icon-dice.svg"
          alt=""
          width="24"
          height="24"
          className="advice-generator-card__button-img"
        />
      </button>
    </main>
  );
};
