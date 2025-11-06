export const App = () => {
  return (
    <main className="advice-generator-card">
      <section className="advice-generator-card__text">
        <h1 className="advice-generator-card__text-title">Advice #117</h1>
        <q className="advice-generator-card__text-quotation">It is easy...</q>
      </section>

      <img
        src="./assets/images/pattern-divider-mobile.svg"
        alt=""
        width="295"
        height="16"
        className="advice-generator-card__divider"
      />
      <button className="advice-generator-card__button">
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
