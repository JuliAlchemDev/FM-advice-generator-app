const { useState, useEffect } = React;

export const App = () => {
  const [advice, setAdvice] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, quotation } = advice;

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {cache: "no-store"});
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setAdvice({
        id: data.slip.id,
        quotation: data.slip.advice,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const getNewAdvice = () => {
    setLoading(true);
    setError(null);

    setTimeout(()=> {
      fetchAdvice();
    }, 500)
    
  };

  // Monitor picture source changes on resize
  useEffect(() => {
    const pictureSource = document.querySelector(
      ".advice-generator-card__divider"
    );
    if (!pictureSource) return;

    const handleResize = () => {
      console.log("Current image: ", pictureSource.currentSrc);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // ============================================

  return (
    <main className="advice-generator-card">
      <section className="advice-generator-card__text">
        <h1 className="advice-generator-card__text-title">
          Advice #{id || ""}
        </h1>

        {(loading || error) && (
          <>
            {loading && (
              <p className="advice-generator-card__text-loading">
                Loading advice...
              </p>
            )}
            {error && (
              <p className="advice-generator-card__text-error">
                Something went wrong...
              </p>
            )}
          </>
        )}

        {!loading && !error && advice && (
          <q className="advice-generator-card__text-quotation">{quotation}</q>
        )}
      </section>

      <picture>
        <source
          srcSet="./assets/images/pattern-divider-desktop.svg"
          media="(min-width: 48rem)"
        />
        <img
          src="./assets/images/pattern-divider-mobile.svg"
          alt=""
          width="295"
          height="16"
          className="advice-generator-card__divider"
        />
      </picture>

      <button className="advice-generator-card__button" onClick={getNewAdvice} disabled={loading}>
        <img
          src="./assets/images/icon-dice.svg"
          alt="Get new advice"
          width="24"
          height="24"
          className="advice-generator-card__button-img"
        />
      </button>
    </main>
  );
};
