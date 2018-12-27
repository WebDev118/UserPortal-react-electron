import React from 'react';
import i18n from '../Common/i18n';
export class NewFaxes extends React.Component {
  render() {
    let lng = this.props.lng;
    return(
  		<div id="new-fax" className="common-box">
        <img src="fax.png" alt="fax"/>
        <span className="text text-right">
          <h1>{this.props.allfaxescount}</h1>
          <p>{i18n.t('total.label', { lng })+" "+i18n.t('faxes.label', { lng })}</p>
        </span>
      </div>
  );}
}

