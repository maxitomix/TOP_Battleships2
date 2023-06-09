function Ship(name, length){
    let hits = Array(length).fill(false);

    return{
        name,
        length,
        hits,
        hit: function(position){
            hits[position] = true;
        },
        isSunk: function(){
            return hits.every((hit) => hit === true);
        }
    }
}

export  { Ship};