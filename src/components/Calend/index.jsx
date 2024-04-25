import React from "react";
import * as calendar from './calendar';
import classnames from 'classnames';
import './index.css';


export default class Calendar extends React.Component {

static defaultProps = {
      date: new Date(),
      years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017 ,2018, 2019, 2020, 2021, 2022, 2023, 2024],
      mounthNames: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December'],
      weekDayNames: ['Mon','Tue', 'Wed', 'Thur', 'Fri','Sat', 'Sun'],
      onChange: Function.prototype
};

state = {
      date: this.props.date,
      currentDate: new Date(),
      selectedDate: null
};

// getting somthing for view
get year() {
   return this.state.date.getFullYear();
};
get month() {
   return this.state.date.getMonth();
};
get day() {
   return this.state.date.getDate();
};

// click and change
handlePrevMonthButtonClick= () => {
  const date = new Date(this.year, this.month -1);
  this.setState({date});
};
handleNextMonthButtonClick= () => {
  const date = new Date(this.year, this.month +1);
  this.setState({date});
};
handleSelectChange= () => {
  const year = this.yearSelect.value;
  const month = this.monthSelect.value;

  const date = new Date(year, month);

  this.setState({date});

};
handleDayClick= date => {
this.setState ({selectedDate: date});
this.props.onChange(date);
};


  render() {
    const {years, mounthNames, weekDayNames} = this.props;
    const {currentDate, selectedDate} = this.state;
    const monthData = calendar.getMonthData(this.year, this.month);

    return (
     <div className="calendar">
      <header>

        <button onClick={this.handlePrevMonthButtonClick} >{'<'}</button>

        <select 
        value={this.month}
        onChange={this.handleSelectChange} 
        ref={element => this.monthSelect = element}
        >
          {mounthNames.map((name, index) =>
           <option key={name} value={index}>{name}</option>
        )}
        </select>
        <select 
        value={this.year}
        onChange={this.handleSelectChange} 
        ref={element => this.yearSelect = element}
        >
          {years.map(year => 
             <option key={year} value={year}>{year}</option>
          )}
        </select>

        <button onClick={this.handleNextMonthButtonClick} >{'>'}</button>
      </header>

      <table>
        <thead>
          <tr>
            {weekDayNames.map(name => 
            <th key={name}>{name}</th>
            )}
          </tr>
        </thead>
        
        <tbody>
          {monthData.map((week, index)=>
             <tr key={index} className='week'>

              {week.map((date, index) => date ?
                <td 
                key={index} 
                className={classnames('day',{
                'today': calendar.areEqual(date, currentDate),
                'selected': calendar.areEqual(date, selectedDate)
                })}
                onClick={() => this.handleDayClick(date)}
                >{date.getDate()}</td>
                :
                <td key = {index} />
            )}
             </tr>
        )}

        </tbody>
      </table>
     </div>
    );
  }
}
