import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 1500,
  width: 250,
  position: 'top-end',
});

export default function (icon, title) {
  Toast.fire({
    icon,
    title,
  });
}
