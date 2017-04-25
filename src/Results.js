import React from 'react';

import {store} from './store.js';
import ReCom from './ReCom.js';
import _ from 'lodash';

let resultStyle = { // ##
  display: 'inline-block',
  width: 120,
  verticalAlign: 'top',
  marginRight: 20,
  lineHeight: '10px',
  height: 140,
  fontSize: 10,
  whiteSpace: 'nowrap',
  overflow:'hidden',
};
class Result extends ReCom { // ##
  constructor(props, context) {
    super(props, store);
  }

  render () {
    let n = this.props.n;
    let o = this.get(['search', 'results', n]);
    if(!o) {
      return <div style={resultStyle} />
    } else {
    return o && <div
      onMouseEnter={() => this.set('ui.currentResult', n)}
      style={resultStyle}>
      <div><strong>{o.TITLE[0]} &nbsp;</strong></div>
      <div><em>{(o.CREATOR || []).join(' & ')} &nbsp;</em></div>
      <br/>
      <img src={o.coverUrlThumbnail && 'https:' + o.coverUrlThumbnail} alt=""
           style={{ 
              height: 50,
              width: 35,
              border: '1px solid black',
              float: 'left',
            }}/>
          <img src="" alt="Ny forside (TODO)"
           style={{ 
              height: 100,
              width: 70,
              border: '1px solid black',
              float: 'right',
            }}/>
    </div>
    }
  }

}

export default class Results extends ReCom { // ##

  constructor(props, context) {
    super(props, store);
  }

  render() {
    return <div style={{
      display: 'inline-block',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'auto',
      width: '100%'
    }}>

    {this.get('ui.searchError') && 
      <div style={{
        display: 'inline-block',
        outline: '1px solid red',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'auto'
      }}>
      <h3>Error</h3>
      <pre>{String(this.get('ui.searchError'))}</pre>
    </div>
    }
    {_.range(10).map(i => <Result key={i} n={i}/>)}
  </div>
  }
}

