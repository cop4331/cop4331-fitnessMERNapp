import React, { useState } from 'react';

function AccessUI(props)
{

    var color = '';
    var search = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [colorList,setColorList] = useState('');

    var userId = props.userId;
    if( userId === undefined )
    {
        userId = 1;
    }

    const addColor = async event => 
    {
	    event.preventDefault();

        var js = '{"userId":"'+userId+'","color":"'+color.value+'"}';

        try
        {
            const response = await fetch('http://localhost:5000/api/addColor',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Color has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    };

    const searchColor = async event => 
    {
        event.preventDefault();
        
        var js = '{"userId":"'+userId+'","search":"'+search.value+'"}';

        try
        {
            const response = await fetch('http://localhost:5000/api/searchColors',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res.results;
            var resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Color(s) has been retrieved');
            setColorList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }

    };

    return(
        <div id="accessUIDiv">
            <br />

            <input type="text" id="searchText" placeholder="Color To Search For" ref={(c) => search = c} />
            <button type="button" id="searchColorButton" class="buttons" onClick={searchColor}> Search Color </button><br />
            <span id="colorSearchResult">{searchResults}</span>
            <p id="colorList">{colorList}</p><br /><br />

            <input type="text" id="colorText" placeholder="Color To Add" ref={(c) => color = c} />
            <button type="button" id="addColorButton" class="buttons" onClick={addColor}> Add Color </button><br />
            <span id="colorAddResult">{message}</span>

        </div>
    );
}

export default AccessUI;
