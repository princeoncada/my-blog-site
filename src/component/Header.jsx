import '../style/Header.css'

function Header() {
    return (
        <header>
            <div className="links">
                <a className="link" href="/"><h3>Home</h3></a>
                <a className="link" href="/"><h3>Blogs</h3></a>
                <a className="link" href="/"><h3>Contact Me</h3></a>
            </div>
        </header>
    )
}

export default Header;