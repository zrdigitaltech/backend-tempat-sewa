export default function Index() {
    return (
        <footer>
            <div className="container">
                <p>
                    Copyright &copy; {new Date().getFullYear()}{" "}
                    <a
                        href="https://zrdevelopers.github.io/"
                        target="_blank"
                        className="text-primary"
                    >
                        ZRDevelopers
                    </a>{" "}
                    . All rights reserved
                </p>
            </div>
        </footer>
    );
}
