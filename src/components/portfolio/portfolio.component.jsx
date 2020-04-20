import React from "react";
import { ReactForm } from "../form/form.component";
import "./portfolio..styles.scss";

class Portfolio extends React.Component {
    state = {
      balance: "",
      portfolio: [],
      errorMessage: "",
      ticker: "",
      qty: "",
      portfolioTotal: 0,
    };
    
   inputChangeHandler = e => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    };
  clearFormHendler = () => {
    this.setState({
      ticker: "",
      qty: "",
    });
  }
    handleSubmit = (event, data) => {
      event.preventDefault();
      const { ticker, qty } = this.state;
      fetch(`http://localhost:3000/stock/${ticker}`)
        .then(response => response.json())
        .then(stock => {
          let price = parseFloat(stock['response'][0]['price']).toFixed(2);
          let change = parseFloat(stock['response'][0]['chg']).toFixed(2);
          let newBalance = this.state.balance - price;
          if (newBalance > 0){
            this.setState({ balance: parseInt(newBalance) });
          
            fetch("http://localhost:3000/transactions", {
              method: "POST",
              body: JSON.stringify({
                ticker: ticker,
                qty: qty,
                user_id: this.props.user.id,
                price: price,
                change: change
              }),
              headers: { "content-type": "application/json" }
            })
              .then(response => response.json())
              .then(responsePortfolio => {
                if (!responsePortfolio.error) {
                  this.props.addStockTransaction(responsePortfolio);
                  let { portfolio, portfolioTotal } = this.state;
                  portfolio.push(responsePortfolio);
                  let result = [];
                  let tickerPrice = responsePortfolio.price;
                  portfolio.reduce(function (res, value) {
                    if (!res[value.ticker]) {
                      res[value.ticker] = { ticker: value.ticker, qty: 0, price: 0.00 };
                      result.push(res[value.ticker]);
                    }
                    res[value.ticker].qty += parseInt(value.qty);
                    res[value.ticker].price += parseFloat(value.price);

                    return res;
                  }, {});
                  this.setState({ 
                    portfolio: result,
                    portfolioTotal: Math.round(portfolioTotal + parseFloat(tickerPrice)),
                    ticker: "",
                    qty: "",
                  });
                }
              });
          }
        })
    };
  
  componentDidMount() {
    const { id, attributes } = this.props.user;
    const { balance } = attributes;
    this.setState({ balance: balance });
    fetch(`http://localhost:3000/portfolio/${id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(portfolio => {
        if(portfolio.length>1){
          let sum = 0;
          portfolio.forEach(el => sum += el.price);
          this.setState({
            portfolio: portfolio,
            portfolioTotal: Math.round(sum)
          });
        } else if (portfolio.length > 0) {
            this.setState({
              portfolio: portfolio,
              portfolioTotal: portfolio[0].price
            })
          }
      }); 
  }
  render() {
    const inputs = [
      {
        name: "ticker",
        placeholder: "Ticker",
        type: "text",
        value: this.state.ticker,
        divClassName: "col-md-3",
        inputGroupAddon: "tickerInput-addon",
        onChange: this.inputChangeHandler,
        required: "required",
        ariaLabel: "ticker"
      },
      {
        name: "qty",
        placeholder: "Qty",
        type: "number",
        value: this.state.qty,
        divClassName: "col-md-3",
        inputGroupAddon: "qty-addon",
        onChange: this.inputChangeHandler,
        required: "required",
        ariaLabel: "Qty"
      }
    ];
    return (
      <div >
        <div className="portfolio">
          <table className="main-tbl">
            <td>
                  <h1>Portfolio(${this.state.portfolioTotal})</h1>
                  <table className="table table-hover">
                    <tbody>
                      {this.state.portfolio.map(item => {
                        return (
                          <tr key={item.id}>
                            <td style={{ border: "none", position: 'right'}}>{item.ticker}</td>
                            <td style={{ border: "none" }}>-</td>
                            <td style={{ border: "none" }}>
                                {item.qty} Shares
                            </td>
                            <td style={{ border: "none", color: parseFloat(item.change) >= 0 ? 'green' : 'red'}}>${item.price}</td>
                            </tr>
                        );
                      })}
                    </tbody>
                  </table>
            </td>
          </table>
          <div class='cash'><h2>Cash - ${this.state.balance}</h2>
            <ReactForm
              errorMessage={this.state.errorMessage}
              handleSubmit={this.handleSubmit}
              state={this.state}
              inputs={inputs}
              submitButtonText={"Buy"}
            /></div>
          </div>
      </div>
    );
  }
}
export default Portfolio;
