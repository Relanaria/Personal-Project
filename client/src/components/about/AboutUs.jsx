import './aboutUs.css'

export default function AboutUs() {

    return (
        <div className="about-us">
            <h1 className='aboutUsHeader'>About Us</h1><br/>
            <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                    At Second Hand Manga, our mission is to bring the joy of manga to everyone. We believe that manga should be accessible and affordable, and that's why we offer a wide range of pre-owned manga for sale. Whether you're a long-time fan or new to the world of manga, we're here to help you find your next great read.
                </p>
            </section>
            <section className="team-section">
                <h2>Our Team</h2>
                <p>
                    We are a small team of manga enthusiasts dedicated to sharing our love for this unique art form. Our team members come from diverse backgrounds, but we all share a passion for manga and a commitment to excellent customer service.
                </p>
            </section>
            <section className="contact-section">
                <h2>Contact Us</h2>
                <p>If you have any questions or suggestions, feel free to reach out to us:</p>
                <p>Email: support@secondhandmanga.com</p>
                <p>Phone: +123-456-7890</p>
            </section>
        </div>
    );
};