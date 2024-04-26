// @ts-nocheck
function OrgForm() {
    return <>
        <form action="">
            <label htmlFor="">Nom de l'organització</label>
            <input type="text" id="name" />

            <label htmlFor="">Correu</label>
            <input type="email" id="email" />

            <label htmlFor="">Localització</label>
            <input type="text" />

            <label htmlFor="">Adreça</label>
            <input type="text" id="address" />

            <label htmlFor="">Tipus d'organització</label>
            <select id="cars" name="cars">
                <option value="volvo">Casal cultural</option>
                <option value="saab">Ateneu Popular</option>
                <option value="fiat">Casal Popular</option>
                <option value="audi">Altres...</option>
            </select>
        </form>
    </>
}

export default OrgForm