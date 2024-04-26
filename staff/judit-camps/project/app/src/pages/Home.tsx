// @ts-nocheck

function Home({ onLoginClick }) {

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }
    return <>
        <header className="fixed top-0 w-full bg-red-400">

            <h1>Hola!</h1>
            <button>registra't</button>
            <button onClick={handleLoginClick} >entra</button >
        </header>


        <footer className="bg-red-400 fixed bottom-0 w-full h-20" > this is the footer</footer>
    </>
}

export default Home