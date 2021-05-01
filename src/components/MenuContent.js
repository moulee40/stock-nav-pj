import React from 'react'
import Overview from './Overview/Overview';
import ExchangeStats from './ExchangeStats/ExchangeStats';
import StockAnalysis from './StockAnalysis/StockAnalysis';
import FinancialCalculation from './FinancialCalculation/FinancialCalculation';

function MenuContent({currentNavItem}) {
    return (
        <div>
        {currentNavItem === 0 && <Overview/>}
        {currentNavItem === 1 && <ExchangeStats/>}
        {currentNavItem === 2 && <StockAnalysis/>}
        {currentNavItem === 3 && <FinancialCalculation/>}
        </div>
    )
}

export default MenuContent
