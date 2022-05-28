import { api, LightningElement , track} from 'lwc';
import {  loadScript } from 'lightning/platformResourceLoader';
import  'c/nsmjquery';
export default class NsmGenericSearchBar extends LightningElement {
    @api nodivisor =false; //desactiva el borde dedivision al final del picklist
    @api sortAsc = false;    // si es true ordena el elemento ASCENDENDTE
    @api sortDesc = false;  //  si es true y sortAsc es false ordena el elemento descendente
    @api value;      //valor seleccionado del picklist
    @api setvalues;  //valores del picklist [{value:"hola", label:"hi"} ,{"value":"adios", label:"bye"}]
    @api picklistlabel;  //Etiqueta del picklist

    @track picklistvals;

    connectedCallback(){
        this.picklistvals = this.setvalues;
        console.log(this.picklistvals)
        if(this.sortAsc){
            this.picklistvals.sort();
        }else if(this.sortDesc){
            this.picklistvals.sort();
            this.picklistvals.reverse();
        }
        
    }

    renderedCallback(){
        loadScript(this, "")
        .then(()=>{
            console.log('jQuery loaded');
            this.loadstyles();
        }).catch(error =>{
            console.log('Failed to load the jQuery: ' + error);
        })

    }

    loadstyles(){
        let divisor =  this.nodivisor;
        console.log(divisor)
       if(divisor === "true"){
         let els = this.template.querySelector(".custom-select-trigger")
            $(els).addClass("nodivisor")
       }
         
    }


    handleselect(ev){
       let elem = ev.target
        console.log( $(elem)
              .parents(".custom-select-wrapper"))
            $(elem)
              .parents(".custom-select-wrapper")
              .find("select")
              .val($(elem).data("value"));
            $(elem)
              .parents(".custom-options")
              .find(".custom-option")
              .removeClass("selection");
            $(elem).addClass("selection");
            $(elem).parents(".custom-select").removeClass("opened");
            $(elem)
              .parents(".custom-select")
              .find(".custom-select-trigger")
              .text($(elem).text());

            $(elem).parents(".custom-select")
            .find(".custom-select-trigger")
            .removeClass("triggeropen");
    }

     
    
    handleclicktrigger(ev){
        $(ev.target)
        .parents(".custom-select")
        .toggleClass("opened");

        $(ev.target).addClass("triggeropen");
    }

    handlechange(ev){
        let value = ev.target.value;
        this.dispatchEvent(new CustomEvent('handlechange', { detail: value }));
    }
}