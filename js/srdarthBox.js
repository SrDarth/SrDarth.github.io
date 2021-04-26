jQuery(function () {

new jBox('Modal', {
        attach: $('#modalDragOnMantenedor'),
        title: 'Reparador',
        overlay: false,
        content: $('#cmantenedor'),
        draggable: 'title',
        repositionOnOpen: false,
        repositionOnContent: false
    });
});

jQuery(function () {
    new jBox('Modal', {
        attach: $('#modalDragOn'),
        title: 'Filial e Centro',
        overlay: false,
        content: $('#coletaeentrega'),
        draggable: 'title',
        repositionOnOpen: false,
        repositionOnContent: false
    });

});


jQuery(function () {
new jBox('Modal', {
        attach: $('#modalDragOnSala'),
        title: 'Email para SALA TIM',
        overlay: false,
        content: $('#salatim'),
        draggable: 'title',
        repositionOnOpen: false,
        repositionOnContent: false
    });
});



jQuery(function () {	
new jBox('Modal', {
        attach: $('#modalDragOnEmergencial'),
        width: '100%',
        title: 'Texto Emergencial',
        overlay: false,
        content: $('#emergencialdemo'),
        draggable: 'title',
        repositionOnOpen: false,
        repositionOnContent: false
    });
});
jQuery(function () {	
new jBox('Modal', {
        attach: $('#modalDragOnNormal'),
        width: '100%',
        title: 'Texto Normal',
        overlay: false,
        content: $('#normaldemo'),
        draggable: 'title',
        repositionOnOpen: false,
        repositionOnContent: false,
    });
});

jQuery(function () {	
$('.AtencaoAPAGAR').jBox('Confirm', {
    content: 'Tem certeza que quer apagar tudo?',
    cancelButton: 'Não',
    confirmButton: 'Sim!'
  });
 });
jQuery(function () {
$('.LembreteCalc').jBox('Mouse', {
		content: 'Remover o PONTO " . "'
	});
 });
jQuery(function () {
$('#CALCULAR').srdarth();
 });