import Swal from "sweetalert2";

export class swalUtil {
    public static error = (title:string, text:string, confirmButtonText:string) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: confirmButtonText,
            confirmButtonColor:'#276eb7'
          });
    }
}