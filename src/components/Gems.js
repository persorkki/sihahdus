import React, { useEffect } from "react";
import gemData from "../data/GemList.json";
import { useState } from "react";

export function GemSearch() {
    const [gems, setGems] = useState(gemData);
    //input state
    const [search, setSearch] = useState("");
    useEffect(() => {
        if (search.length >= 3) {
            setGems(gemData.filter((gem) => { return gem.Name.toLowerCase().includes(search.toLowerCase()) && !gem.Name.includes("Vaal") }));
        } else {
            setGems([]);
        }
    }, [search]);


    return (
        <div>
            <input className="gems-search-input" onChange={(e) => setSearch(e.target.value)} placeholder="gem name here" />
            <div className="gems-container">
                        {gems.slice(0,6).map((gem, i) => (
                            <SingleGem key={i} gem={gem} />
                        ))}
                
            </div>
        </div>
    );
}

function SingleGem({ gem }) {
    return (
        <div className="gem-card">
            
            <div className="gem-name"><p>{gem.Name}</p>
                <img src={gem.icon} alt={gem.Name} loading="lazy" className="gem-icon" />
            </div>
            
            <p className="gem-effect">{gem.Effect}</p>
            <p className="gem-weight">{gem.Weight}</p>
            
        </div>
    );
}
