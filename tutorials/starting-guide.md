Using tipps Pokemon Api !!!
<br /><br />
Example of using the API Endpoints

{<br />
    &emsp;{<br />
    &emsp;"count": 1281,<br />
    &emsp;"next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",<br />
    &emsp;"previous": null,<br />
    &emsp;"results": [<br />
    &emsp;&emsp;{<br />
    &emsp;&emsp;&emsp;"name": "bulbasaur",<br />
    &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/pokemon/1/"<br />
    &emsp;&emsp;},<br />
    &emsp;&emsp;{<br />
    &emsp;&emsp;&emsp;"name": "ivysaur",<br />
    &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/pokemon/2/"<br />
    &emsp;&emsp;},<br />
    &emsp;&emsp;{
    &emsp;&emsp;&emsp;"name": "venusaur",<br />
    &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/pokemon/3/"<br />
    &emsp;&emsp;},<br />
    &emsp;&emsp;{<br />
    &emsp;&emsp;&emsp;"name": "charmander",<br />
    &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/pokemon/4/"<br />
    &emsp;&emsp;}<br />
    &emsp;&emsp;]<br />
    }<br />
}

In the ['results'] field, you can access the digits [0, 1, 2, 3] and use the ['url'] field to get to the data package for the respective Pokémon.  

Example for the endpoint attack works according to the same principle  

{<br />
    &emsp;"count": 920,<br />
    &emsp;"next": "https://pokeapi.co/api/v2/move?offset=10&limit=10",<br />
    &emsp;"previous": null,<br />
    &emsp;"results": [<br />
        &emsp;&emsp;{<br />
        &emsp;&emsp;&emsp;"name": "pound",<br />
        &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/move/1/"<br />
        &emsp;&emsp;},<br />
        &emsp;&emsp;{<br />
        &emsp;&emsp;&emsp;"name": "karate-chop",<br />
        &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/move/2/"<br />
        &emsp;&emsp;},<br />
        &emsp;&emsp;{<br />
        &emsp;&emsp;&emsp;"name": "double-slap",<br />
        &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/move/3/"<br />
        &emsp;&emsp;},<br />
        &emsp;&emsp;{<br />
        &emsp;&emsp;&emsp;"name": "comet-punch",<br />
        &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/move/4/"<br />
        &emsp;&emsp;},<br />
        &emsp;&emsp;{  
        &emsp;&emsp;&emsp;"name": "mega-punch",<br />
        &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/move/5/"<br />
        &emsp;&emsp;},<br />
        &emsp;&emsp;{<br />
        &emsp;&emsp;&emsp;"name": "pay-day",<br />
        &emsp;&emsp;&emsp;"url": "https://pokeapi.co/api/v2/move/6/"<br />
        &emsp;&emsp;}<br />
    ]<br />
}

In addition, you can see the sum of all attacks in the ['count'] field.