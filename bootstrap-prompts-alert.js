window._originalAlert = window.alert;
window.alert = function(text, obj) {
    var bootStrapAlert = function() {     
        if(! $.fn.modal.Constructor)
            return false;
        if($('#windowAlertModal').length == 1)
            return true;        
        $('.container').append(' \
        <div id="windowAlertModal" class="modal fade bs-example-modal-sm" aria-labelledby="mySmallModalLabel" tabindex="-1" role="dialog" aria-hidden="true"> \
        <div class="modal-dialog modal-sm"> \
          <div class="modal-content"> \
              <div class="modal-body"> \
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                <p> alert text </p> \
              </div> \
              <div class="modal-footer"> \
                <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Fechar</button> \
              </div> \
          </div> \
        </div> \
        </div> \
      ');     
    return true;    
    }
    if ( bootStrapAlert() ){      
      $('#windowAlertModal .modal-body p').text(text);
      $('#windowAlertModal').modal();

      if(obj && obj.jquery){
        $('#windowAlertModal').on('hidden.bs.modal', function () {
          obj.focus();
        });
      }

    }  else {        
        window._originalAlert(text);
    }
}
window._originalConfirm = window.confirm;
window.confirm = function(text, cb) {
    var initTemplate = function(){
      if($('#windowConfirmModal').length == 1)
        return true;
      $('body').append(' \
        <div id="windowConfirmModal" class="modal fade bs-example-modal-sm" aria-labelledby="mySmallModalLabel" tabindex="-1" role="dialog" aria-hidden="true"> \
      <div class="modal-dialog modal-sm"> \
        <div class="modal-content"> \
                <div class="modal-body"> \
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                    <p> alert text </p> \
                </div> \
                <div class="modal-footer"> \
                  <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancelar</button> \
                  <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Ok</button> \
                </div> \
        </div> \
      </div> \
        </div> \
      ');
    }

    var bootStrapConfirm = function() {
      if(! $.fn.modal.Constructor)
          return false;

      $('body').off('click', '#windowConfirmModal .btn-primary');
      $('body').off('click', '#windowConfirmModal .btn-danger');

      function confirm() { cb(true); }
      function deny() { cb(false); }

      $('body').on('click', '#windowConfirmModal .btn-primary', confirm);
      $('body').on('click', '#windowConfirmModal .btn-danger', deny);

      return true;
    }

    initTemplate()

    if ( bootStrapConfirm() ){
        $('#windowConfirmModal .modal-body p').text(text);
        $('#windowConfirmModal').modal();
    }  else {
        console.log('bootstrap was not found');
        cb(window._originalConfirm(text));
    }
}