import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null); 

    const handleSearch = (event) => {
        event.preventDefault();

        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`)
            setSearch("");
        } else {
            setAriaInvalid(true); 
        }
    };

    return (
        <form onSubmit={handleSearch} role="search"> 
            <fieldset role="group">
                <input
                    type="text"
                    name="search"
                    placeholder={ariaInvalid ? "Devi cercare qualcosa!" : "Search a game"} 
                    onChange={(event) => {
                        setSearch(event.target.value);}}
                    value={search}
                    aria-invalid={ariaInvalid} 
                    className="input input-bordered w-24 md:w-auto"
                />
                <input type="submit" value="Go" className="btn btn-primary ml-2" />
            </fieldset>
        </form>
    );
}