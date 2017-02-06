import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import { Alert, Glyphicon } from 'react-bootstrap';
import Menu from './Menu'

let AlertMixin = {
  alert: function(style, alert) {
    switch (typeof(alert)) {
      case 'string':
        return this.alert(style, {title: alert});
      case 'function':
        return this.alert(style, alert());
      case 'object':
        return new Promise((resolve, reject) => {
          //NOTICE: this.props.dispatch only exists with default `connect`.`mapDispatchToProps` or when set
          resolve(this.props.dispatch({type: 'ALERT', alert: Object.assign({style: style}, alert)}));
        })
      default:
        throw new Error("invalid alert type!");
    }
  }
}

let isSmallScreen = function() {
  return window.innerWidth < 768;
}

let Layout = connect(
  (state, ownProps) => {
    return {
      alert: state.alert
    }
  },
  (dispatch, props) => {
    return {
      dispatch: dispatch,
      handleAlertDismiss: function() {
        dispatch({type: 'DISMISS_ALERT'});
      }
    }
  }
)(withRouter(React.createClass({
  getInitialState: function() {
    return {
      toggled: false
    };
  },
  render: function() {
    if (this.props.alert && this.props.alert.timeout !== 0 && this.props.alert.style !== 'danger') {
      setTimeout(this.props.handleAlertDismiss, this.props.alert.timeout || 5000);
    }
    return (
      <div id="wrapper" className={this.toggled()}>
        <Swipeable onSwipedLeft={this.hide} onSwipedRight={this.show} className="swipeable">
          <Menu/>
          <section id="page-content-wrapper" className="container-fluid">
            {this.props.alert &&
              <Alert bsStyle={this.props.alert.style} onDismiss={this.props.handleAlertDismiss}>
                {this.props.alert.title && <h4>{this.props.alert.title}</h4>}
                {this.props.alert.summary && <strong>{this.props.alert.summary} </strong>}
                {this.props.alert.message}
              </Alert>
            }
            {this.props.children}
          </section>
        </Swipeable>
      </div>
    );
  },
  toggled: function() {
    return this.state.toggled ? 'toggled' : null;
  },
  toggle: function() {
    this.setState((prev, props) => {
      return {toggled: !prev.toggled};
    });
  },
  hide: function() {
    this.setState({toggled: !isSmallScreen()});
  },
  show: function() {
    this.setState({toggled: isSmallScreen()});
  }
})));

let BooleanGlyph = ({value}) => {
  return <Glyphicon glyph={!!value ? 'ok' : 'remove'} style={{color: !!value ? 'green' : 'red'}}/>
};

let DataTable = ({className, children}) => {
  return (
    <table className={['data', className].join(' ')}>
      <tbody>
        {children}
      </tbody>
    </table>
  );
}

DataTable.Item = ({label, value, children}) => {
  return (
    <tr>
      {typeof(label) === 'string' && <td>{label}</td>}
      <td>
        {children || (value && value.toString()) || '-'}
      </td>
    </tr>
  );
};

DataTable.DataTableItem = ({label, value, key, children}) => {
  return (
    <DataTable.Item label={label} value={value} key={key}>
      <DataTable>
        {children}
      </DataTable>
    </DataTable.Item>
  );
};

let DataList = ({value, children}) => {
  return (
    <ul>
    {(children || value || []).map(item => {
      return <li key={item}>{item}</li>
    })}
    </ul>
  )
}

let DataTableScaffold = ({className, data}) => {
  return (
    <DataTable className={className}>
      {Object.keys(data).map(item => {
        if (data[item] === null || data[item] === undefined) {
          return <DataTable.Item label={item} value={data[item]} key={item}/>
        }
        function renderItem(value, label) {
          switch (typeof(value)) {
            case 'object':
              if (value instanceof Array) {
                return (
                  <DataTable.Item label={label} key={label}>
                    <ul>
                      {value.map((listItem) => {
                        return (
                          <li>
                            <DataTable className="inline">
                              {renderItem(listItem)}
                            </DataTable>
                          </li>
                        );
                      })}
                    </ul>
                  </DataTable.Item>
                )
              } else {
                return (
                  <DataTable.Item label={label} key={label}>
                    <DataTableScaffold data={value}/>
                  </DataTable.Item>
                )
              }
            case 'boolean':
              return (
                <DataTable.Item label={label} key={label}>
                  <BooleanGlyph value={value}/>
                </DataTable.Item>
              )
            default:
              return <DataTable.Item label={label} key={label} value={value}/>
          }
        }
        return renderItem(data[item], item);
      })}
    </DataTable>
  );
}

export { Layout as default, AlertMixin, BooleanGlyph, DataTable, DataList, DataTableScaffold };
