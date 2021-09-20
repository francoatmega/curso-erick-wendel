/* 
    Object literal became internaly Explicty functions, their prototypes point to prototypes of this Explicty functions
*/

const obj = {}
const arr = []
const fn = () => {}
const str = 'string'

const { deepStrictEqual, throws } = require('assert')

{
    console.log('string __proto__ should be equal to String __proto__')
    deepStrictEqual(str.__proto__, String.prototype)
}
{
    console.log('object __proto__ should be equal to Object __proto__')
    deepStrictEqual(obj.__proto__, Object.prototype)
}
{
    console.log('array __proto__ should be equal to Array __proto__')
    deepStrictEqual(arr.__proto__, Array.prototype)
}
{
    console.log('function __proto__ should be equal to Function __proto__')
    deepStrictEqual(fn.__proto__, Function.prototype)
}
{
    console.log('object __proto__.__proto__ should be null')
    deepStrictEqual(obj.__proto__.__proto__, null)
}

{
    function Employee() {}
    Employee.prototype.salary = () => 'salary'

    function Supervisor() {}
    Supervisor.prototype = Object.create(Employee.prototype)
    Supervisor.prototype.profitShare = () => 'profitShare'

    function Manager() {}
    Manager.prototype = Object.create(Supervisor.prototype)
    Manager.prototype.monthlyBonuses = () => 'monthlyBonuses'

    /* 
        If we try to call from Manager object the salary method, a error will be thrown.
    */
    {
        console.log('should thrown an error because __proto__ is pointing to Manager prototype')
        throws(() => Manager.salary(), TypeError)
    }

    /*
        To access prototype chain of object we need to call new operator
    */

    {
        console.log('should access salary method inherited from Employee')
        deepStrictEqual(new Manager().salary(), 'salary')
    }
    {
        console.log('should access profitShare method inherited from Supervisor')
        deepStrictEqual(new Manager().profitShare(), 'profitShare')
    }
    {
        console.log('should access monthlyBonuses method inherited from Manager')
        deepStrictEqual(new Manager().monthlyBonuses(), 'monthlyBonuses')
    }
    {
        console.log('should first prototype in chain of prototypes be equal to Supervisor prototype')
        deepStrictEqual(new Manager().__proto__, Manager.prototype)
    }
    {
        console.log('should second prototype in chain of prototypes be equal to Supervisor prototype')
        deepStrictEqual(new Manager().__proto__.__proto__, Supervisor.prototype)
    }
    {
        console.log('should third prototype in chain of prototypes be equal to Employee prototype')
        deepStrictEqual(new Manager().__proto__.__proto__.__proto__, Employee.prototype)
    }
    {
        console.log('should fourth prototype in chain of prototypes be equal to Object prototype')
        deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__, Object.prototype)
    }
    {
        console.log('should fithy prototype in chain of prototypes be equal to null')
        deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__.__proto__, null)
    }
}

{
    class Employee {
        salary = () => 'salary'
    }
    
    class Supervisor extends Employee {
        profitShare = () => 'profitShare'
    }
    
    class Manager extends Supervisor {
        monthlyBonuses = () => 'monthlyBonuses'
    }

    deepStrictEqual(new Manager().__proto__, Manager.prototype)
    deepStrictEqual(new Manager().__proto__.__proto__, Supervisor.prototype)
    deepStrictEqual(new Manager().__proto__.__proto__.__proto__, Employee.prototype)
    deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__, Object.prototype)
    deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__.__proto__, null)
}
