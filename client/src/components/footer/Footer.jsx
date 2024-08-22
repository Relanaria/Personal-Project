import { Link } from "react-router-dom";

export default function Footer() {
        return (
            <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>Second Hand Manga is your go-to place for buying and reading pre-owned manga. We bring the best manga to your doorstep.</p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Catalog</Link></li>
                        <li><Link to="/store">Store</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: support@secondhandmanga.com</p>
                    <p>Phone: +123-456-7890</p>
                </div>
                <div className="footer-section social">
                    <h2>Follow Us</h2>
                    <Link to="#" className="social-icon"><i className="fab fa-facebook-f"></i></Link>
                    <Link to="#" className="social-icon"><i className="fab fa-twitter"></i></Link>
                    <Link to="#" className="social-icon"><i className="fab fa-instagram"></i></Link>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Second Hand Manga. All rights reserved.</p>
            </div>
        </footer>
        );
}