import bbl from '../../asset/BBL.png'
import cgu from '../../asset/cgu.pdf'
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <p className="footer-p1">Une question? Un renseignement? Nous sommes là pour vous aider</p>
            <p className="footer-p2">Contactez-nous au 04 74 82 74 48</p>
            
            <a className="footer-a" href="https://groupe-bbl.com/">Cliquez ici pour visiter notre site Web</a>
            
            <a href="" className="footer-a-img"><img className="footer-img" src={bbl} alt="logo BBL" /></a>
            
            <small className="footer-mentions">
                <a href={cgu}>Conditions générales de vente</a>
                <a href="https://www.linkedin.com/in/stéphanie-merle-carpentier/">Création de site internet</a>
            </small>
            
            
        </div>
    )
}

