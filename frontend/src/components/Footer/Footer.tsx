import "./Footer.css"
import tipethLogo from "../../assets/tipeth_logo_icon_blue.svg"

export function Footer() {
	return (
		<footer className="footer">
			<div className="footer__container-logo logo">
				<img className="logo__img" src={tipethLogo} alt="Tipeth logo" />
				<span className="logo__text">Tipeth</span>
			</div>
			<div className="footer__footer-info footer-info">
				<p className="footer-info__text">Copyright by <b>Elvira Fatin</b></p>
				<a href="" target="_blank" rel="noreferrer">View on Github</a>
				<p className="footer-info__network">Run on Base Sepolia</p>
			</div>

		</footer>
	)
}