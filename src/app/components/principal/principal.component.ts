import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForDoService } from '../../services/for-do.service';
import { contentThing, Thing } from 'src/app/interfaces/thing.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  public formulario: FormGroup;
  public Things: contentThing[];

  constructor(private _Service: ForDoService) {
    this.ShowThing();
  }

  ngOnInit() {
    this.crearFormulario();
  }


  private crearFormulario() {
    this.formulario = new FormGroup({
      thing: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  public getThing() {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    
    console.log(this.formulario.value);
    this._Service.PostThing(this.formulario.value).subscribe((data) => {

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })

    })

  }

  public ShowThing() {
    this._Service.GetThing().subscribe((data: Thing) => {
      console.log(data);
      this.Things = data.Things

      console.log(this.Things);


    }
    )
  }


  public CambiarStatus(thing: contentThing) {
    console.log(thing);
    thing.complete = !thing.complete
    console.log(thing);
    

    this._Service.putThing(thing).subscribe((data) => console.log(data))
   
   

  }

  public eliminartarea(thingId){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._Service.deleteThing(thingId).subscribe(()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });
     
      }
    })
    
  }

  

}
