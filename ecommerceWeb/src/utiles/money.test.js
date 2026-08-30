import {it,expect,describe} from 'vitest' ;

import moneyGenrator from './money';

describe('moneyGenrator',() =>{
it('formats 1999 cents as $19.99', ()=>{
    expect(moneyGenrator(1999)).toBe('$19.99');
});

it('display 2 decimals', ()=>{
    expect(moneyGenrator(1090)).toBe('$10.90');
    expect(moneyGenrator(100)).toBe('$1.00');
});
});