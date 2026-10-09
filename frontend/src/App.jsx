
import { useTranslation } from "react-i18next";

function App() {
  	const { t, i18n } = useTranslation();

  	return (
    <main>
      	<h1>{t("app.title")}</h1>
      	<h2>{t("app.welcome")}</h2>
      	<p>{t("app.subtitle")}</p>
      	<p>{t("app.testMessage")}</p>

      	<label htmlFor="language">
        	{t("app.language")}:{" "}
      	</label>

      	<select
        	id="language"
        	value={i18n.resolvedLanguage?.split("-")[0] || "en"}
        	onChange={(event) => i18n.changeLanguage(event.target.value)}
      	>
        <option value="en">English</option>
        <option value="id">Bahasa Indonesia</option>
        <option value="de">Deutsch</option>
      	</select>

      	<div>
			<button>{t("app.buttons.createCountry")}</button>
			<button>{t("app.buttons.login")}</button>
			<button>{t("app.buttons.register")}</button>
      	</div>
    </main>
  	);
}

export default App;