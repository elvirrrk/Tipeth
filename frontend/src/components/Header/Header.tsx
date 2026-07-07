import "./Header.css"
import tipethLogo from "../../assets/tipeth_logo_icon_blue.svg"

export function Header() {
	return (
		<header className="header">
			<div className="header__logo logo">
				<img className="logo__img" src={tipethLogo} alt="Tipeth logo"/>
				<span className="logo__text">Tipeth</span>
			</div>
		</header>
	)
}