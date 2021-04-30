function jBox(type, options) {
	
	this.options = {
		
		// jBox ID
		id: null,					// Escolha um id único, caso contrário, o jBox irá definir um para você (jBoxID1, jBoxID2, ...)
		
		// Dimensão
		width: 'auto',				// Largura da área de conteúdo (e.g. 'auto', 100)
		height: 'auto',				// Altura da área de conteúdo
		minWidth: null,				// largura mínima
		maxHeight: null,			// Altura mínima
		minWidth: null,				// largura máxima
		maxHeight: null,			// Altura mínima
		
		// Anexo
		attach: null,				// Anexe o jBox aos elementos (se nenhum elemento de destino for fornecido, o jBox usará o elemento anexado como destino)
		trigger: 'click',			// O evento para abrir ou fechar seus jBoxes, use 'click' ou 'mouseenter'
		preventDefault: false,		// Evita o evento padrão ao abrir o jBox (por exemplo, não siga o href em um link ao clicar nele)
		
		// Conteudo
		title: null,				// Adiciona um título ao seu jBox
		content: null,				// Você pode usar uma string para definir texto ou HTML como conteúdo, ou um seletor de elemento (por exemplo, jQuery ('# jBox-content')) para anexar um ou vários elementos (os elementos anexados obterão a exibição do estilo: 'bloco', então ocultá-los com exibição de estilo CSS: 'nenhum' de antemão)
		getTitle: null,				// Pega o título de um atributo quando o jBox abre
		getContent: null,			// Pega o conteúdo de um atributo quando o jBox abre
		isolateScroll: true,		// Isola a rolagem para o contêiner de conteúdo
		
		// solicitação AJAX
		ajax: {						// Definir um url fará uma chamada AJAX quando o jBox abrir
			url: null,				// URL para enviar a solicitação AJAX para
			data: '',				// Dados para enviar com sua chamada AJAX (por exemplo, 'id = 82 & limit = 10')
// Opcional, você pode adicionar qualquer opção jQuery AJAX (http://api.jquery.com/jquery.ajax/)
			reload: false,			// Reenviar a chamada ajax toda vez que o jBox abrir
			getData: 'data-ajax',	// O atributo no elemento de origem onde o AJAX procurará os dados para enviar, por exemplo, data-ajax = "id = 82 & limit = 10"
			setContent: true,		// Definir automaticamente a resposta como novo conteúdo quando a chamada AJAX for concluída
			spinner: true			// Oculta o conteúdo atual e adiciona um spinner durante o carregamento, você pode passar o conteúdo html para adicionar seu próprio spinner, por exemplo, spinner: '<div class = "mySpinner"> </div>'
		},
		
		// Posição
		target: null,				// O elemento de destino onde o jBox será aberto
		position: {
			x: 'center',			// Posição horizontal (use um número, 'esquerda', 'direita' ou 'centro')
			y: 'center'				// Posição vertical (use um número, 'superior', 'inferior' ou 'centro')
		},
		outside: null,				// Use 'x', 'y' ou 'xy' para mover seu jBox para fora do elemento de destino
		offset: 0,					// Deslocamento para a posição final, você pode definir valores diferentes para x e y com um objeto, por exemplo, {x: 15, y: 0}
		
		attributes: {				// Observe que os atributos só podem ser 'esquerda' ou 'direita' ao usar números para posição, por exemplo, {x: 300, y: 20}
			x: 'left',				// Posição horizontal, use 'esquerda' ou 'direita'
			y: 'top'				// Posição vertical, use 'superior' ou 'inferior'
		},
		adjustPosition: false,		// Ajusta a posição quando não há espaço suficiente (use true, 'flip' ou 'move')
		adjustTracker: false,		// Por padrão, o jBox ajusta a posição ao abrir, para ajustar ao rolar ou redimensionar, use 'rolar', 'redimensionar' ou 'verdadeiro' (ambos os eventos)
		adjustDistance: 5,			// A que distância da borda da janela começamos a ajustar, use um objeto para definir valores diferentes: {bottom: 5, top: 50, left: 5, right: 20}
		fixed: false,				// Seu jBox permanecerá na posição ao rolar
		reposition: false,			// Calcula a nova posição quando o tamanho da janela muda
		repositionOnOpen: true,		// Calcula a nova posição cada vez que o jBox abre (ao invés de apenas quando ele abre pela primeira vez)
		repositionOnContent: true,	// Calcula a nova posição quando o conteúdo muda com .setContent () ou .setTitle ()
		
		// Ponteiro
		pointer: false,				// Seu ponteiro sempre apontará para o elemento de destino, então a opção fora deve ser 'x' ou 'y'
		pointTo: 'target',			// Definir algo diferente de 'destino' adicionará um ponteiro mesmo se não houver nenhum elemento de destino definido ou encontrado (Use 'superior', 'inferior', 'esquerda' ou 'direita')
		
		// Animações
		fade: 180,					// Duração do fade em ms, defina como 0 ou falso para desativar
		animation: 'pulse',			// Animação ao abrir ou fechar (use 'pulse', 'zoomIn', 'zoomOut', 'move', 'slide', 'flip', 'tada') (CSS inspirado em Daniel Edens Animate.css: http://daneden.me/animate)
		
		// Aparencia
		theme: 'Default',			// Definir uma classe de tema jBox
		addClass: '',				// Adiciona classes ao wrapper
		overlay: false,				// Adiciona uma sobreposição quando o jBox abre (defina a cor e a opacidade com CSS)
		zIndex: 10000,				// Use um zIndex alto (sua sobreposição terá o zIndex mais baixo de todos os seus jBoxes (com sobreposições) menos um)
		
		// Atrasos
		delayOpen: 0,				// Atraso na abertura em ms (observe que o atraso será ignorado se o seu jBox não terminar de fechar)
		delayClose: 0,				// Atraso de fechamento em ms (observe que sempre há um atraso de fechamento de pelo menos 10 ms para garantir que o jBox não será fechado ao abrir imediatamente)
		
		// Eventos de fechamento
		closeOnEsc: true,			// Feche o jBox ao pressionar a tecla [esc]
		closeOnClick: false,		// Feche o jBox com o clique do mouse, use 'true' (clique em qualquer lugar), 'box' (clique no próprio jBox), 'overlay' (clique na sobreposição), 'body' (clique em qualquer lugar menos o jBox)
		closeOnMouseleave: false,	// Fecha o jBox quando o mouse deixa a área do jBox ou a área do elemento anexado
		closeButton: false,			// Adiciona um botão Fechar ao seu jBox, use 'title', 'overlay', 'box' ou true (true adicionará o botão à sobreposição, título ou caixa, nessa ordem se algum desses elementos puder ser encontrado)
		
		// Outras opções
		constructOnInit: false,		// Constrói jBox quando está sendo inicializado
		blockScroll: false,			// Quando o jBox está aberto, bloco de rolagem
		appendTo: jQuery('body'), 	// Fornece um elemento se você deseja que o jBox seja posicionado dentro de um elemento específico (útil apenas para posições fixas ou quando os valores de posição são números)
		draggable: null,			// Torne seu jBox arrastável (use 'true', 'title' ou forneça um elemento como alça) (inspirado em Chris Coyiers CSS-Tricks http://css-tricks.com/snippets/jquery/draggable-without-jquery- ui /)
		dragOver: true,				// Quando você tem vários jBoxes arrastáveis, o que você selecionar sempre se moverá sobre os outros
		
		// Eventos					// Observação: você pode usar 'this' nas funções de evento, ele se refere ao seu objeto jBox (por exemplo, onInit: function () {this.open ();})
		onInit: null,				// Disparado quando o jBox é inicializado
		onBeforeInit: null,			// Disparado quando o jBox começa a inicializar, útil para adicionar suas próprias funções internas
		onAttach: null,				// Disparado quando o jBox se anexa aos elementos
// TODO onPosition
		onCreated: null,			// Disparado quando o jBox é criado e está disponível no DOM
		onOpen: null,				// Disparado quando o jBox abre
		onClose: null,				// Disparado quando o jBox fecha
		onCloseComplete: null,		// Disparado quando o jBox é completamente fechado (quando o desvanecimento termina, útil se você quiser destruir o jBox quando ele for fechado)
		
		// Apenas para o tipo "Confirmar"
		confirmButton: 'Submit',	// Texto para o botão de envio
		cancelButton: 'Cancel',		// Texto para o botão de cancelamento
		confirm: null,				// Função a ser executada ao clicar no botão enviar. Por padrão, o jBox usará primeiro o onclick e depois o atributo href
		cancel: null,				// Função a ser executada ao clicar no botão Cancelar
		
		// Apenas para o tipo "Aviso"
		autoClose: 7000,			// Momento em que o jBox deve fechar automaticamente
		color: null,				// Torna seus avisos coloridos, use 'black', 'red', 'green', 'blue', 'yellow'
		stack: true,				// Defina como falso para desativar o empilhamento de notificações
		audio: false,				// Defina o url para um arquivo de áudio sem extensão, por exemplo '/ url / nome do arquivo'. O jBox irá procurar por um arquivo .mp3 e um .ogg
		volume: 100,				// Porcentagem de volume para arquivos de áudio
		
		// Apenas para o tipo "Imagem"
		src: 'href',				// O atributo de onde jBox obtém a fonte da imagem, por exemplo href = "/ path_to_image / image.jpg"
		gallery: 'data-jbox-image',	// O atributo onde você define a galeria de imagens, por exemplo data-jbox-image = "gallery1"
		imageLabel: 'title',		// O atributo de onde jBox obtém o rótulo da imagem, por exemplo title = "Minha etiqueta"
		imageFade: 600,				// A duração do fade para imagens
		imageSize: 'contain'		// Como exibir as imagens: Use valores de posição de fundo CSS, por exemplo 'cobrir', 'conter', 'automático', 'inicial', '50% 50% '
	};

	// Opções de tipo padrão
	this.defaultOptions = {
		// Opções padrão para dicas de ferramentas
		'Tooltip': {
			getContent: 'title',
			trigger: 'mouseenter',
			position: {x: 'center', y: 'top'},
			outside: 'y',
			pointer: true,
			adjustPosition: true,
			reposition: true
		},
		// Opções padrão para dicas de ferramentas do mouse
		'Mouse': {
			target: 'mouse',
			position: {x: 'right', y: 'bottom'},
			offset: 15,
			trigger: 'mouseenter',
			adjustPosition: 'flip'
		},
		// Opções padrão para janelas modais
		'Modal': {
			target: jQuery(window),
			fixed: true,
			blockScroll: false,
			closeOnEsc: true,
			closeOnClick: 'overlay',
			closeButton: true,
			overlay: true,
			animation: 'zoomOut'
		},
		// Opções padrão para janelas de confirmação modal
		'Confirm': {
			target: jQuery(window),
			fixed: true,
			attach: jQuery('[data-confirm]'),
			getContent: 'data-confirm',
			content: 'Do you really want to do this?',
			minWidth: 320,
			maxWidth: 460,
			blockScroll: true,
			closeOnEsc: true,
			closeOnClick: 'overlay',
			closeButton: true,
			overlay: true,
			animation: 'zoomOut',
			preventDefault: true,
			_onAttach: function(el) {
				// Extraia o href ou o evento onclick se nenhum evento de envio for passado
				if (!this.options.confirm) {
					var submit = el.attr('onclick') ? el.attr('onclick') : (el.attr('href') ? (el.attr('target') ? 'window.open("' + el.attr('href') + '", "' + el.attr('target') + '");'  : 'window.location.href = "' + el.attr('href') + '";') : '');
					el.prop('onclick', null).data('jBox-Confirm-submit', submit);
				}
			},
			_onCreated: function() {
				// Adicione um rodapé ao contêiner jBox
				this.footer = jQuery('<div class="jBox-Confirm-footer"/>');
				jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-cancel"/>').html(this.options.cancelButton).click(function() { this.options.cancel && this.options.cancel(); this.close(); }.bind(this)).appendTo(this.footer);
				this.submitButton = jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-submit"/>').html(this.options.confirmButton).appendTo(this.footer);
				this.footer.appendTo(this.container);
			},
			_onOpen: function() {
				// Defina a nova ação para o botão de envio
				this.submitButton.off('click.jBox-Confirm' + this.id).on('click.jBox-Confirm' + this.id, function() { this.options.confirm ? this.options.confirm() : eval(this.source.data('jBox-Confirm-submit')); this.close(); }.bind(this));
			}
		},
		// Opções padrão para avisos
		'Notice': {
			target: jQuery(window),
			fixed: true,
			position: {x: 20, y: 20},
			attributes: {x: 'right', y: 'top'},
			animation: 'zoomIn',
			closeOnClick: 'box',
			_onInit: function () {
				this.open();
				this.options.delayClose = this.options.autoClose;
				this.options.delayClose && this.close();
			},
			_onCreated: function() {
				this.options.color && this.wrapper.addClass('jBox-Notice-color jBox-Notice-' + this.options.color);
				this.wrapper.data('jBox-Notice-position', this.options.attributes.x + '-' + this.options.attributes.y);
			},
			_onOpen: function() {
				// Percorre os avisos no mesmo canto da janela e os move ou destrói
				jQuery.each(jQuery('.jBox-Notice'), function(index, el) {
					el = jQuery(el);
					
					if (el.attr('id') == this.id || el.data('jBox-Notice-position') != this.options.attributes.x + '-' + this.options.attributes.y) return;
					if (!this.options.stack) {
						el.data('jBox').close({ignoreDelay: true});
						return;
					}
					el.css('margin-' + this.options.attributes.y, parseInt(el.css('margin-' + this.options.attributes.y)) + this.wrapper.outerHeight() + 10);
				}.bind(this));
				
				// Toca o arquivo de áudio, o IE8 não suporta áudio
				this.options.audio && this.audio({url: this.options.audio, valume: this.options.volume});
			},
			// Remova o aviso do DOM ao finalizar o fechamento
			_onCloseComplete: function() {
				this.destroy();
			}
		},
		// Opções padrão para imagens
		'Image': {
			target: jQuery(window),
			fixed: true,
			blockScroll: true,
			closeOnEsc: true,
			closeOnClick: 'overlay',
			closeButton: true,
			overlay: true,
			animation: 'zoomOut',
			width: 800,
			height: 533,
			attach: jQuery('[data-jbox-image]'),
			preventDefault: true,
			
			// TODO: E se a imagem não for encontrada?
// TODO: E se a primeira imagem de uma galeria precisar de algum tempo para carregar, mas outras imagens estiverem no conteúdo. Talvez adicione um recipiente preto em branco
			
			_onInit: function() {
				this.images = this.currentImage = {};
				this.imageZIndex = 1;
				
				// Loop através das imagens, classificar e salvar na variável global
				this.attachedElements && jQuery.each(this.attachedElements, function (index, item) {
					item = jQuery(item);
					if (item.data('jBox-image-gallery')) return;
					var gallery = item.attr(this.options.gallery) || 'default';
					!this.images[gallery] && (this.images[gallery] = []);
					this.images[gallery].push({src: item.attr(this.options.src), label: (item.attr(this.options.imageLabel) || '')});
					
					// Remova o atributo de título para que ele não mostre a dica de ferramenta do navegador
					this.options.imageLabel == 'title' && item.removeAttr('title');
					
					// Armazena dados no elemento de origem para fácil acesso
					item.data('jBox-image-gallery', gallery);
					item.data('jBox-image-id', (this.images[gallery].length - 1));
				}.bind(this));
				
				// Ajudante para injetar a imagem na área de conteúdo
				var appendImage = function(gallery, id, preload, open) {
					if (jQuery('#jBox-image-' + gallery + '-' + id).length) return;
					
					var image = jQuery('<div/>', {
						id: 'jBox-image-' + gallery + '-' + id,
						'class': 'jBox-image-container'
					}).css({
						backgroundImage: 'url(' + this.images[gallery][id].src + ')',
						backgroundSize: this.options.imageSize,
						opacity: (open ? 1 : 0),
						zIndex: (preload ? 0 : this.imageZIndex++)
					}).appendTo(this.content);
					
					var text = jQuery('<div/>', {
						id: 'jBox-image-label-' + gallery + '-' + id,
						'class': 'jBox-image-label' + (open ? ' active' : '')
					}).html(this.images[gallery][id].label).appendTo(this.imageLabel);
					
					!open && !preload && image.animate({opacity: 1}, this.options.imageFade);
				}.bind(this);
				
				// Helper to show new image label
				var showLabel = function(gallery, id) {
					jQuery('.jBox-image-label.active').removeClass('active');
					jQuery('#jBox-image-label-' + gallery + '-' + id).addClass('active');
				};
				
				// Show images when they are loaded or load them if not
				this.showImage = function(img) {
					// Get the gallery and the image id from the next or the previous image
					if (img != 'open') {
						var gallery = this.currentImage.gallery;
						var id = this.currentImage.id + (1 * (img == 'prev') ? -1 : 1);
						id = id > (this.images[gallery].length - 1) ? 0 : (id < 0 ? (this.images[gallery].length - 1) : id);
						// Or get image data from source element
					} else {
						var gallery = this.source.data('jBox-image-gallery');
						var id = this.source.data('jBox-image-id');
						
						// Remove or show the next and prev buttons
						jQuery('.jBox-image-pointer-prev, .jBox-image-pointer-next').css({display: (this.images[gallery].length > 1 ? 'block' : 'none')});
					}
					
					// Set new current image
					this.currentImage = {gallery: gallery, id: id};
					
					// Show image if it already exists
					if (jQuery('#jBox-image-' + gallery + '-' + id).length) {
						jQuery('#jBox-image-' + gallery + '-' + id).css({zIndex: this.imageZIndex++, opacity: 0}).animate({opacity: 1}, (img == 'open') ? 0 : this.options.imageFade);
						showLabel(gallery, id);
						
						// Load image if not found
					} else {
						// TODO loading not working properly anymore
						this.wrapper.addClass('jBox-loading');
						var image = jQuery('<img src="' + this.images[gallery][id].src + '">').load(function() {
							appendImage(gallery, id, false);
							showLabel(gallery, id);
							this.wrapper.removeClass('jBox-loading');
						}.bind(this));
					}
					
					// Preload next image
					var next_id = id + 1;
					next_id = next_id > (this.images[gallery].length - 1) ? 0 : (next_id < 0 ? (this.images[gallery].length - 1) : next_id);
					
					(!jQuery('#jBox-image-' + gallery + '-' + next_id).length) && jQuery('<img src="' + this.images[gallery][next_id].src + '">').load(function() {
						appendImage(gallery, next_id, true);
					});
				};
			},
			_onCreated: function() {
			
				// TODO: NO ID!!!
			
				this.imageLabel = jQuery('<div/>', {'id': 'jBox-image-label'}).appendTo(this.wrapper);
				this.wrapper.append(jQuery('<div/>', {'class': 'jBox-image-pointer-prev', click: function() { this.showImage('prev'); }.bind(this)})).append(jQuery('<div/>', {'class': 'jBox-image-pointer-next', click: function() { this.showImage('next'); }.bind(this)}));
			},
			_onOpen: function() {
				// Add a class to body so you can control the appearance of the overlay, for images a darker one is better
				jQuery('body').addClass('jBox-image-open');
				
				// Add key events
				jQuery(document).on('keyup.jBox-' + this.id, function(ev) {
					(ev.keyCode == 37) && this.showImage('prev');
					(ev.keyCode == 39) && this.showImage('next');
				}.bind(this));
				
				// Load the image from the attached element
				this.showImage('open');
			},
			_onClose: function() {
				jQuery('body').removeClass('jBox-image-open');
				
				// Remove key events
				jQuery(document).off('keyup.jBox-' + this.id);
			},
			_onCloseComplete: function() {
				// Hide all images
				this.wrapper.find('.jBox-image-container').css('opacity', 0);
			}
		}
	};
	
	// Set default options for jBox types
	if (jQuery.type(type) == 'string') {
		this.type = type;
		type = this.defaultOptions[type] ? this.defaultOptions[type] : window['jBox' + type + 'Options'];
	}
	
	// Merge options
	this.options = jQuery.extend(true, this.options, type, options);
	
	// Function to fire events
	this._fireEvent = function(event, pass) {
		this.options['_' + event] && (this.options['_' + event].bind(this))(pass);
		this.options[event] && (this.options[event].bind(this))(pass);
	};
	
	// Fire onBeforeInit event
	this._fireEvent('onBeforeInit');
	
	// Get unique ID
	if (this.options.id === null) {
		this.options.id = 'jBoxID' + jBox._getUniqueID();
	}
	this.id = this.options.id;
	
	// Correct impossible options
	((this.options.position.x == 'center' && this.options.outside == 'x') || (this.options.position.y == 'center' && this.options.outside == 'y')) && (this.options.outside = false);
	(!this.options.outside || this.options.outside == 'xy') && (this.options.pointer = false);
	
	// Correct multiple choice options
	jQuery.type(this.options.offset) != 'object' && (this.options.offset = {x: this.options.offset, y: this.options.offset});
	this.options.offset.x || (this.options.offset.x = 0);
	this.options.offset.y || (this.options.offset.y = 0);
	jQuery.type(this.options.adjustDistance) != 'object' ? (this.options.adjustDistance = {top: this.options.adjustDistance, right: this.options.adjustDistance, bottom: this.options.adjustDistance, left: this.options.adjustDistance}) : (this.options.adjustDistance = jQuery.extend({top: 5, left: 5, right: 5, bottom: 5}, this.options.adjustDistance));
	
	// Save where the jBox is aligned to
	this.align = (this.options.outside && this.options.outside != 'xy') ? this.options.position[this.options.outside] : (this.options.position.y != 'center' && jQuery.type(this.options.position.y) != 'number' ? this.options.position.x : (this.options.position.x != 'center' && jQuery.type(this.options.position.x) != 'number' ? this.options.position.y : this.options.attributes.x));
	
	// Save default outside position
	this.options.outside && this.options.outside != 'xy' && (this.outside = this.options.position[this.options.outside]);
	
	// I know browser detection is bad practice, but for now it seems the only option to get jBox working in IE8
	var userAgent = navigator.userAgent.toLowerCase();
	this.IE8 = userAgent.indexOf('msie') != -1 && parseInt(userAgent.split('msie')[1]) == 8;
	
	// Save global var for webkit prefix
	this.prefix = userAgent.indexOf('webkit') != -1 ? '-webkit-' : '';
	
	// Internal functions, used to easily get values
	this._getOpp = function(opp) { return {left: 'right', right: 'left', top: 'bottom', bottom: 'top', x: 'y', y: 'x'}[opp]; };
	this._getXY = function(xy) { return {left: 'x', right: 'x', top: 'y', bottom: 'y', center: 'x'}[xy]; };
	this._getTL = function(tl) { return {left: 'left', right: 'left', top: 'top', bottom: 'top', center: 'left', x: 'left', y: 'top'}[tl]; };
	
	// Check for SVG support
	this._supportsSVG = function() {
		return document.createElement('svg').getAttributeNS;
	}
	
	// Create an svg element
	this._createSVG = function(type, options) {
		var svg = document.createElementNS('http://www.w3.org/2000/svg', type);
		jQuery.each(options, function (index, item) {
			svg.setAttribute(item[0], (item[1] || ''));
		});
		return svg;
	};
	
	// Append a svg element to a svg container
	this._appendSVG = function(source, target) {
		return target.appendChild(source);
	};
	
	// Isolate scrolling in a container
	this._isolateScroll = function(el) {
		if(!el || !jQuery(el).length) return;
		el.on('DOMMouseScroll.jBoxIsolatedScroll mousewheel.jBoxIsolatedScroll', function(ev) {
			var delta = ev.wheelDelta || (ev.originalEvent && ev.originalEvent.wheelDelta) || -ev.detail,
				overflowBottom = this.scrollTop + el.outerHeight() - this.scrollHeight >= 0,
				overflowTop = this.scrollTop <= 0;
				if ((delta < 0 && overflowBottom) || (delta > 0 && overflowTop)) ev.preventDefault();
		});
	};
	
	// Create jBox
	this._create = function() {
		if (this.wrapper) return;
		
		// Create wrapper
		this.wrapper = jQuery('<div/>', {
			id: this.id,
			'class': 'jBox-wrapper' + (this.type ? ' jBox-' + this.type : '') + (this.options.theme ? ' jBox-' + this.options.theme : '') + (this.options.addClass ? ' ' + this.options.addClass : '') + (this.IE8 ? ' jBox-IE8' : '')
		}).css({
			position: (this.options.fixed ? 'fixed' : 'absolute'),
			display: 'none',
			opacity: 0,
			zIndex: this.options.zIndex
			
			// Save the jBox instance in the wrapper, so you can get access to your jBox when you only have the element
		}).data('jBox', this);
		
		// Add mouseleave event (.parents('*') might be a performance nightmare! Maybe there is a better way)
		this.options.closeOnMouseleave && this.wrapper.mouseleave(function(ev) {
			// Only close when the new target is not the source element
			!this.source || !(ev.relatedTarget == this.source[0] || jQuery.inArray(this.source[0], jQuery(ev.relatedTarget).parents('*')) !== -1) && this.close();
		}.bind(this));
		
		// Add closeOnClick: 'box' events
		(this.options.closeOnClick == 'box') && this.wrapper.on('touchend click', function() { this.close({ignoreDelay: true}); }.bind(this));
		
		// Create container
		this.container = jQuery('<div/>', {'class': 'jBox-container'}).appendTo(this.wrapper);
		
		// Create content
		this.content = jQuery('<div/>', {'class': 'jBox-content'}).css({width: this.options.width, height: this.options.height, minWidth: this.options.minWidth, minHeight: this.options.minHeight, maxWidth: this.options.maxWidth, maxHeight: this.options.maxHeight}).appendTo(this.container);
		
		// Isolate scrolling
		if (this.options.isolateScroll) this._isolateScroll(this.content);
		
		// Create close button
		if (this.options.closeButton) {
			this.closeButton = jQuery('<div/>', {'class': 'jBox-closeButton jBox-noDrag'}).on('touchend click', function(ev) { this.isOpen && this.close({ignoreDelay: true}); }.bind(this));
			
			if (this._supportsSVG()) {
				var closeButtonSVG = this._createSVG('svg', [['viewBox', '0 0 24 24']]);
				this._appendSVG(this._createSVG('path', [['d', 'M22.2,4c0,0,0.5,0.6,0,1.1l-6.8,6.8l6.9,6.9c0.5,0.5,0,1.1,0,1.1L20,22.3c0,0-0.6,0.5-1.1,0L12,15.4l-6.9,6.9c-0.5,0.5-1.1,0-1.1,0L1.7,20c0,0-0.5-0.6,0-1.1L8.6,12L1.7,5.1C1.2,4.6,1.7,4,1.7,4L4,1.7c0,0,0.6-0.5,1.1,0L12,8.5l6.8-6.8c0.5-0.5,1.1,0,1.1,0L22.2,4z']]), closeButtonSVG);
				this.closeButton.append(closeButtonSVG);
			} else {
				this.wrapper.addClass('jBox-nosvg');
			}
			
			// Add close button to jBox container
			if (this.options.closeButton == 'box' || (this.options.closeButton === true && !this.options.overlay && !this.options.title)) {
				this.wrapper.addClass('jBox-closeButton-box');
				this.closeButton.appendTo(this.container);
			}
		}
		
		// Append jBox to DOM
		this.wrapper.appendTo(this.options.appendTo);
		
		// Create pointer
		if (this.options.pointer) {
			
			// Get pointer vars and save globally
			this.pointer = {
				position: (this.options.pointTo != 'target') ? this.options.pointTo : this._getOpp(this.outside),
				xy: (this.options.pointTo != 'target') ? this._getXY(this.options.pointTo) : this._getXY(this.outside),
				align: 'center',
				offset: 0
			};
			
			this.pointer.element = jQuery('<div/>', {'class': 'jBox-pointer jBox-pointer-' + this.pointer.position}).appendTo(this.wrapper);
			this.pointer.dimensions = {
				x: this.pointer.element.outerWidth(),
				y: this.pointer.element.outerHeight()
			};
			
			if (jQuery.type(this.options.pointer) == 'string') {
				var split = this.options.pointer.split(':');
				split[0] && (this.pointer.align = split[0]);
				split[1] && (this.pointer.offset = parseInt(split[1]));
			}
			this.pointer.alignAttribute = (this.pointer.xy == 'x' ? (this.pointer.align == 'bottom' ? 'bottom' : 'top') : (this.pointer.align == 'right' ? 'right' : 'left'));
			
			// Set wrapper CSS
			this.wrapper.css('padding-' + this.pointer.position, this.pointer.dimensions[this.pointer.xy]);
			
			// Set pointer CSS
			this.pointer.element.css(this.pointer.alignAttribute, (this.pointer.align == 'center' ? '50%' : 0)).css('margin-' + this.pointer.alignAttribute, this.pointer.offset);
			this.pointer.margin = {}; this.pointer.margin['margin-' + this.pointer.alignAttribute] = this.pointer.offset;
			
			// Add a transform to fix centered position
			(this.pointer.align == 'center') && this.pointer.element.css(this.prefix + 'transform', 'translate(' + (this.pointer.xy == 'y' ? (this.pointer.dimensions.x * -0.5 + 'px') : 0) + ', ' + (this.pointer.xy == 'x' ? (this.pointer.dimensions.y * -0.5 + 'px') : 0) + ')');
			
			this.pointer.element.css((this.pointer.xy == 'x' ? 'width' : 'height'), parseInt(this.pointer.dimensions[this.pointer.xy]) + parseInt(this.container.css('border-' + this.pointer.alignAttribute + '-width')));
			
			// Add class to wrapper for CSS access
			this.wrapper.addClass('jBox-pointerPosition-' + this.pointer.position);
		}
		
		// Set title and content
		this.setContent(this.options.content, true);
		this.setTitle(this.options.title, true);
		
		// Make jBox draggable
		if (this.options.draggable) {
			var handle = (this.options.draggable == 'title') ? this.titleContainer : (this.options.draggable.length > 0 ? this.options.draggable : (this.options.draggable.selector ? jQuery(this.options.draggable.selector) : this.wrapper));
			handle.addClass('jBox-draggable').on('mousedown', function(ev) {
				if (ev.button == 2 || jQuery(ev.target).hasClass('jBox-noDrag') || jQuery(ev.target).parents('.jBox-noDrag').length) return;
				
				if (this.options.dragOver && this.wrapper.css('zIndex') <= jBox.zIndexMax) {
					jBox.zIndexMax += 1;
					this.wrapper.css('zIndex', jBox.zIndexMax);
				}
				
				var drg_h = this.wrapper.outerHeight(),
					drg_w = this.wrapper.outerWidth(),
					pos_y = this.wrapper.offset().top + drg_h - ev.pageY,
					pos_x = this.wrapper.offset().left + drg_w - ev.pageX;
				jQuery(document).on('mousemove.jBox-draggable-' + this.id, function(ev) {
					this.wrapper.offset({
						top: ev.pageY + pos_y - drg_h,
						left: ev.pageX + pos_x - drg_w
					});
				}.bind(this));
				ev.preventDefault();
			}.bind(this)).on('mouseup', function() { jQuery(document).off('mousemove.jBox-draggable-' + this.id); }.bind(this));
			
			// Add z-index
			jBox.zIndexMax = !jBox.zIndexMax ? this.options.zIndex : Math.max(jBox.zIndexMax, this.options.zIndex);
		}
		
		// Fire onCreated event
		this._fireEvent('onCreated');
	};
	
	// Create jBox onInit
	this.options.constructOnInit && this._create();
	
	// Attach jBox
	this.options.attach && this.attach();
	
	// Position jBox on mouse
	this._positionMouse = function(ev) {
		
		// Calculate positions
		this.pos = {
			left: ev.pageX,
			top: ev.pageY
		};
		var setPosition = function(a, p) {
			// Set centered position
			if (this.options.position[p] == 'center') {
				this.pos[a] -= Math.ceil(this.dimensions[p] / 2);
				return;
			}
			// Move to left or top
			this.pos[a] += (a == this.options.position[p]) ? ((this.dimensions[p] * -1) - this.options.offset[p]) : this.options.offset[p];
			
			return this.pos[a];
		}.bind(this);
		
		// Set position to wrapper
		this.wrapper.css({
			left: setPosition('left', 'x'),
			top: setPosition('top', 'y')
		});
		
		// Adjust mouse position
		this.targetDimensions = {x: 0, y: 0, left: ev.pageX, top: ev.pageY};
		this._adjustPosition();
	};
	
	// Attach document and window events
	this._attachEvents = function() {
		
		// Closing event: closeOnEsc
		this.options.closeOnEsc && jQuery(document).on('keyup.jBox-' + this.id, function(ev) { if (ev.keyCode == 27) { this.close({ignoreDelay: true}); }}.bind(this));
		
		// Closing event: closeOnClick
		if (this.options.closeOnClick === true || this.options.closeOnClick == 'body') {
			jQuery(document).on('touchend.jBox-' + this.id + ' click.jBox-' + this.id, function(ev) {
				if (this.blockBodyClick || (this.options.closeOnClick == 'body' && (ev.target == this.wrapper[0] || this.wrapper.has(ev.target).length)))
					return;
				this.close({ignoreDelay: true});
			}.bind(this));
		}
		
		// Positioning events
		if (((this.options.adjustPosition && this.options.adjustTracker) || this.options.reposition) && !this.fixed && this.outside) {
			
			var scrollTimer,
				scrollTimerTriggered = 0,
				scrollTriggerDelay = 150;	// Trigger scroll and resize events every 150 ms (set a higher value to improve performance)
				
			// Function to delay positioning event
			var positionDelay = function () {
				var now = new Date().getTime();
				if (!scrollTimer) {
					if (now - scrollTimerTriggered > scrollTriggerDelay) {
						this.options.reposition && this.position();
						this.options.adjustTracker && this._adjustPosition();
						scrollTimerTriggered = now;
					}
					scrollTimer = setTimeout(function() {
						scrollTimer = null;
						scrollTimerTriggered = new Date().getTime();
						this.options.reposition && this.position();
						this.options.adjustTracker && this._adjustPosition();
					}.bind(this), scrollTriggerDelay);
				}
			}.bind(this);
			
			// Trigger position events when scrolling
			(this.options.adjustTracker && this.options.adjustTracker != 'resize') && jQuery(window).on('scroll.jBox-' + this.id, function(ev) { positionDelay(); }.bind(this));
			
			// Trigger position events when resizing
			((this.options.adjustTracker && this.options.adjustTracker != 'scroll') || this.options.reposition) && jQuery(window).on('resize.jBox-' + this.id, function(ev) { positionDelay(); }.bind(this));
		}
		
		// Mousemove events
		this.options.target == 'mouse' && jQuery('body').on('mousemove.jBox-' + this.id, function(ev) { this._positionMouse(ev); }.bind(this));
	};
	
	// Detach document and window events
	this._detachEvents = function() {
		
		// Closing event: closeOnEsc
		this.options.closeOnEsc && jQuery(document).off('keyup.jBox-' + this.id);
		
		// Closing event: closeOnClick
		(this.options.closeOnClick === true || this.options.closeOnClick == 'body') && jQuery(document).off('touchend.jBox-' + this.id + ' click.jBox-' + this.id);
		
		// Positioning events
		if ((this.options.adjustPosition && this.options.adjustTracker) || this.options.reposition) {
			jQuery(window).off('scroll.jBox-' + this.id);
			jQuery(window).off('resize.jBox-' + this.id);
		}
		
		// Mousemove events
		this.options.target == 'mouse' && jQuery('body').off('mousemove.jBox-' + this.id);
	};

	// Add overlay
	this._addOverlay = function() {
		
		// If the overlay isn't cached, set overlay or create it
		if (!this.overlay) {
			// Get the overlay and adjust z-Index
			this.overlay = jQuery('#jBox-overlay').length ? jQuery('#jBox-overlay').css({zIndex: Math.min(jQuery('#jBox-overlay').css('z-index'), (this.options.zIndex - 1))}) : (jQuery('<div/>', {id: 'jBox-overlay'}).css({display: 'none', opacity: 0, zIndex: (this.options.zIndex - 1)}).appendTo(jQuery('body')));
			
			// Add close button to overlay
			(this.options.closeButton == 'overlay' || this.options.closeButton === true) && ((jQuery('#jBox-overlay .jBox-closeButton').length > 0) ? jQuery('#jBox-overlay .jBox-closeButton').on('touchend click', function() { this.isOpen && this.close({ignoreDelay: true}); }.bind(this)) : this.overlay.append(this.closeButton));
			
			// Add closeOnClick: 'overlay' events
			(this.options.closeOnClick == 'overlay') && this.overlay.on('touchend click', function() { this.isOpen && this.close({ignoreDelay: true}); }.bind(this));
		}
		
		// Add jBox to overlay data
		var overlay_data = this.overlay.data('jBox') || {};
		overlay_data['jBox-' + this.id] = true;
		this.overlay.data('jBox', overlay_data);
		
		// Abort if overlay is shown already
		if (this.overlay.css('display') == 'block') return;
		
		// Show overlay
		this.options.fade ? (this.overlay.stop() && this.overlay.animate({opacity: 1}, {
			queue: false,
			duration: this.options.fade,
			start: function() { this.overlay.css({display: 'block'}); }.bind(this)
		})) : this.overlay.css({display: 'block', opacity: 1});
	};
	
	// Remove overlay
	this._removeOverlay = function() {
		
		// Abort if no overlay found
		if (!this.overlay) return;
		
		// Remove jBox from data
		var overlay_data = this.overlay.data('jBox');
		delete overlay_data['jBox-' + this.id];
		this.overlay.data('jBox', overlay_data);
		
		// Hide overlay if no other jBox needs it
		if (jQuery.isEmptyObject(overlay_data)) {
			this.options.fade ? (this.overlay.stop() && this.overlay.animate({opacity: 0}, {
				queue: false,
				duration: this.options.fade,
				complete: function() { this.overlay.css({display: 'none'}); }.bind(this)
			})) : this.overlay.css({display: 'none', opacity: 0});
		}
	};
	
	// Generate CSS for animations and append to header
	this._generateCSS = function() {
		if (this.IE8) return;
		
		// Get open and close animations if none provided
		(jQuery.type(this.options.animation) != 'object') && (this.options.animation = {
			pulse: {open: 'pulse', close: 'zoomOut'},
			zoomIn: {open: 'zoomIn', close: 'zoomIn'},
			zoomOut: {open: 'zoomOut', close: 'zoomOut'},
			move: {open: 'move', close: 'move'},
			slide: {open: 'slide', close: 'slide'},
			flip: {open: 'flip', close: 'flip'},
			tada: {open: 'tada', close: 'zoomOut'}
		}[this.options.animation]);
		
		// Get direction var
		this.options.animation.open && (this.options.animation.open = this.options.animation.open.split(':'));
		this.options.animation.close && (this.options.animation.close = this.options.animation.close.split(':'));
		this.options.animation.openDirection = this.options.animation.open ? this.options.animation.open[1] : null;
		this.options.animation.closeDirection = this.options.animation.close ? this.options.animation.close[1] : null;
		this.options.animation.open && (this.options.animation.open = this.options.animation.open[0]);
		this.options.animation.close && (this.options.animation.close = this.options.animation.close[0]);
		
		// Add 'Open' and 'Close' to animation names
		this.options.animation.open && (this.options.animation.open += 'Open');
		this.options.animation.close && (this.options.animation.close += 'Close');
		
		// All animations
		var animations = {
			pulse: {
				duration: 350,
				css: [['0%', 'scale(1)'], ['50%', 'scale(1.1)'], ['100%', 'scale(1)']]
			},
			zoomInOpen: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(0.9)'], ['100%', 'scale(1)']]
			},
			zoomInClose: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(1)'], ['100%', 'scale(0.9)']]
			},
			zoomOutOpen: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(1.1)'], ['100%', 'scale(1)']]
			},
			zoomOutClose: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(1)'], ['100%', 'scale(1.1)']]
			},
			moveOpen: {
				duration: (this.options.fade || 180),
				positions: {top: {'0%': -12}, right: {'0%': 12}, bottom: {'0%': 12}, left: {'0%': -12}},
				css: [['0%', 'translate%XY(%Vpx)'], ['100%', 'translate%XY(0px)']]
			},
			moveClose: {
				duration: (this.options.fade || 180),
				timing: 'ease-in',
				positions: {top: {'100%': -12}, right: {'100%': 12}, bottom: {'100%': 12}, left: {'100%': -12}},
				css: [['0%', 'translate%XY(0px)'], ['100%', 'translate%XY(%Vpx)']]
			},
			slideOpen: {
				duration: 400,
				positions: {top: {'0%': -400}, right: {'0%': 400}, bottom: {'0%': 400}, left: {'0%': -400}},
				css: [['0%', 'translate%XY(%Vpx)'], ['100%', 'translate%XY(0px)']]
			},
			slideClose: {
				duration: 400,
				timing: 'ease-in',
				positions: {top: {'100%': -400}, right: {'100%': 400}, bottom: {'100%': 400}, left: {'100%': -400}},
				css: [['0%', 'translate%XY(0px)'], ['100%', 'translate%XY(%Vpx)']]
			},
			flipOpen: {
				duration: 600,
				css: [['0%', 'perspective(400px) rotateX(90deg)'], ['40%', 'perspective(400px) rotateX(-15deg)'], ['70%', 'perspective(400px) rotateX(15deg)'], ['100%', 'perspective(400px) rotateX(0deg)']]
			},
			flipClose: {
				duration: (this.options.fade || 300),
				css: [['0%', 'perspective(400px) rotateX(0deg)'], ['100%', 'perspective(400px) rotateX(90deg)']]
			},
			tada: {
				duration: 800,
				css: [['0%', 'scale(1)'], ['10%, 20%', 'scale(0.9) rotate(-3deg)'], ['30%, 50%, 70%, 90%', 'scale(1.1) rotate(3deg)'], ['40%, 60%, 80%', 'scale(1.1) rotate(-3deg)'], ['100%', 'scale(1) rotate(0)']]
			}
		};
		
		// Set Open and Close names for standalone animations
		jQuery.each(['pulse', 'tada'], function(index, item) { animations[item + 'Open'] = animations[item + 'Close'] = animations[item]; });
		
		// Function to generate the CSS for the keyframes
		var generateKeyframeCSS = function(ev, position) {
			
			// Generate keyframes CSS
			keyframe_css = '@' + this.prefix + 'keyframes jBox-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
			jQuery.each(animations[this.options.animation[ev]].css, function(index, item) {
				var translate = position ? item[1].replace('%XY', this._getXY(position).toUpperCase()) : item[1];
				animations[this.options.animation[ev]].positions && (translate = translate.replace('%V', animations[this.options.animation[ev]].positions[position][item[0]]));
				keyframe_css += item[0] + ' {' + this.prefix + 'transform:' + translate + ';}';
			}.bind(this));
			keyframe_css += '}';
			
			// Generate class CSS
			keyframe_css += '.jBox-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
			keyframe_css += this.prefix + 'animation-duration: ' + animations[this.options.animation[ev]].duration + 'ms;';
			keyframe_css += this.prefix + 'animation-name: jBox-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ';';
			keyframe_css += animations[this.options.animation[ev]].timing ? (this.prefix + 'animation-timing-function: ' + animations[this.options.animation[ev]].timing + ';') : '';
			keyframe_css += '}';
			
			return keyframe_css;
		}.bind(this);
		
		// Generate css for each event and positions
		var css = '';
		jQuery.each(['open', 'close'], function(index, ev) {
			// No CSS needed for closing with no fade
			if (!this.options.animation[ev] || !animations[this.options.animation[ev]] || (ev == 'close' && !this.options.fade)) return '';
			
			// Generate CSS
			animations[this.options.animation[ev]].positions ?
				jQuery.each(['top', 'right', 'bottom', 'left'], function(index2, position) { css += generateKeyframeCSS(ev, position); }) :
				css += generateKeyframeCSS(ev);
		}.bind(this));
		
		jQuery('<style/>').append(css).appendTo(jQuery('head'));
	};
	
	// Block body clicks for 10ms to prevent extra event triggering
	this._blockBodyClick = function() {
		this.blockBodyClick = true;
		setTimeout(function() { this.blockBodyClick = false; }.bind(this), 10);
	};
	
	// Add css for animations
	this.options.animation && this._generateCSS();
	
	// Animations
	this._animate = function(ev) {
		if (this.IE8) return;
		ev || (ev = this.isOpen ? 'open' : 'close');
		
		// Don't animate when closing with no fade duration
		if (!this.options.fade && ev == 'close') return null;
		
		// Get the current position, use opposite if jBox is flipped
		var animationDirection = (this.options.animation[ev + 'Direction'] || ((this.align != 'center') ? this.align : this.options.attributes.x));
		this.flipped && this._getXY(animationDirection) == (this._getXY(this.align)) && (animationDirection = this._getOpp(animationDirection));
		
		// Add event and position classes
		var classnames = 'jBox-animation-' + this.options.animation[ev] + '-' + ev + ' jBox-animation-' + this.options.animation[ev] + '-' + ev + '-' + animationDirection;
		this.wrapper.addClass(classnames);
		
		// Get duration of animation
		var animationDuration = parseFloat(this.wrapper.css(this.prefix + 'animation-duration')) * 1000;
		ev == 'close' && (animationDuration = Math.min(animationDuration, this.options.fade));
		
		// Remove animation classes when animation is finished
		setTimeout(function() { this.wrapper.removeClass(classnames); }.bind(this), animationDuration);
	};
	
	// Abort animation
	this._abortAnimation = function() {
		if (this.IE8) return;
		
		// Remove all animation classes
		var prefix = 'jBox-animation';
		var classes = this.wrapper.attr('class').split(' ').filter(function(c) {
			return c.lastIndexOf(prefix, 0) !== 0;
		});
		this.wrapper.attr('class', classes.join(' '));
	};
	
	// Adjust position
	this._adjustPosition = function() {
		if (!this.options.adjustPosition) return null;
		
		// Reset cached pointer position
		if (this.positionAdjusted) {
			this.wrapper.css(this.pos);
			this.pointer && this.wrapper.css('padding', 0).css('padding-' + this._getOpp(this.outside), this.pointer.dimensions[this._getXY(this.outside)]).removeClass('jBox-pointerPosition-' + this._getOpp(this.pointer.position)).addClass('jBox-pointerPosition-' + this.pointer.position);
			this.pointer && this.pointer.element.attr('class', 'jBox-pointer jBox-pointer-' + this._getOpp(this.outside)).css(this.pointer.margin);
			this.positionAdjusted = false;
			this.flipped = false;
		}
		
		// Get the window dimensions
		var win = jQuery(window);
		var windowDimensions = {
			x: win.width(),
			y: win.height(),
			top: (this.options.fixed && this.target.data('jBox-fixed') ? 0 : win.scrollTop()),
			left: (this.options.fixed && this.target.data('jBox-fixed') ? 0 : win.scrollLeft())
		};
		windowDimensions.bottom = windowDimensions.top + windowDimensions.y;
		windowDimensions.right = windowDimensions.left + windowDimensions.x;
		
		// Find out where the jBox is out of view area
		var outYT = (windowDimensions.top > this.pos.top - (this.options.adjustDistance.top || 0)),
			outXR = (windowDimensions.right < this.pos.left + this.dimensions.x + (this.options.adjustDistance.right || 0)),
			outYB = (windowDimensions.bottom < this.pos.top + this.dimensions.y + (this.options.adjustDistance.bottom || 0)),
			outXL = (windowDimensions.left > this.pos.left - (this.options.adjustDistance.left || 0)),
			outX = outXL ? 'left' : (outXR ? 'right' : null),
			outY = outYT ? 'top' : (outYB ? 'bottom' : null),
			out = outX || outY;
			
		// Stop here if jBox is not out of view area
		if (!out) return;
		
		// Flip jBox
		if (this.options.adjustPosition != 'move' && (outX == this.outside || outY == this.outside)) {
			
			this.target == 'mouse' && (this.outside = 'right');
			
			// Check if enough space is availible on opposite position
			if (((this.outside == 'top' || this.outside == 'left') ?
				(windowDimensions[this._getXY(this.outside)] - (this.targetDimensions[this._getTL(this.outside)] - windowDimensions[this._getTL(this.outside)]) - this.targetDimensions[this._getXY(this.outside)]) + this.options.offset[this._getXY(this.outside)] :
				(this.targetDimensions[this._getTL(this.outside)] - windowDimensions[this._getTL(this.outside)]) - this.options.offset[this._getXY(this.outside)]
				) > this.dimensions[this._getXY(this.outside)] + parseInt(this.options.adjustDistance[this._getOpp(this.outside)])) {

				// Adjust wrapper and pointer
				this.wrapper.css(this._getTL(this.outside), this.pos[this._getTL(this.outside)] + ((this.dimensions[this._getXY(this.outside)] + (this.options.offset[this._getXY(this.outside)] * (this.outside == 'top' || this.outside == 'left' ? -2 : 2)) + this.targetDimensions[this._getXY(this.outside)]) * (this.outside == 'top' || this.outside == 'left' ? 1 : -1)));
				this.pointer && this.wrapper.removeClass('jBox-pointerPosition-' + this.pointer.position).addClass('jBox-pointerPosition-' + this._getOpp(this.pointer.position)).css('padding', 0).css('padding-' + this.outside, this.pointer.dimensions[this._getXY(this.outside)]);
				this.pointer && this.pointer.element.attr('class', 'jBox-pointer jBox-pointer-' + this.outside);
				this.positionAdjusted = true;
				this.flipped = true;
			}
		}
		
		// Move jBox (only possible with pointer)
		var outMove = (this._getXY(this.outside) == 'x') ? outY : outX;
		
		if (this.pointer && this.options.adjustPosition != 'flip' && this._getXY(outMove) == this._getOpp(this._getXY(this.outside))) {
			
			// Get the maximum space we have availible to adjust
			if (this.pointer.align == 'center') {
				var spaceAvail = (this.dimensions[this._getXY(outMove)] / 2) - (this.pointer.dimensions[this._getOpp(this.pointer.xy)] / 2) - (parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) * (outMove != this._getTL(outMove) ? -1 : 1));
			} else {
				var spaceAvail = (outMove == this.pointer.alignAttribute) ?
					parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) :
					this.dimensions[this._getXY(outMove)] - parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) - this.pointer.dimensions[this._getXY(outMove)];
			}
			
			// Get the overlapping space
			spaceDiff = (outMove == this._getTL(outMove)) ?
				windowDimensions[this._getTL(outMove)] - this.pos[this._getTL(outMove)] + this.options.adjustDistance[outMove] :
				(windowDimensions[this._getOpp(this._getTL(outMove))] - this.pos[this._getTL(outMove)] - this.options.adjustDistance[outMove] - this.dimensions[this._getXY(outMove)]) * -1;
				
			// Add overlapping space on left or top window edge
			if (outMove == this._getOpp(this._getTL(outMove)) && this.pos[this._getTL(outMove)] - spaceDiff < windowDimensions[this._getTL(outMove)] + this.options.adjustDistance[this._getTL(outMove)]) {
				spaceDiff -= windowDimensions[this._getTL(outMove)] + this.options.adjustDistance[this._getTL(outMove)] - (this.pos[this._getTL(outMove)] - spaceDiff);
			}
			
			// Only adjust the maximum availible
			spaceDiff = Math.min(spaceDiff, spaceAvail);
			
			// Move jBox
			if (spaceDiff <= spaceAvail && spaceDiff > 0) {
				this.pointer.element.css('margin-' + this.pointer.alignAttribute, parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) - (spaceDiff * (outMove != this.pointer.alignAttribute ? -1 : 1)));
				this.wrapper.css(this._getTL(outMove), this.pos[this._getTL(outMove)] + (spaceDiff * (outMove != this._getTL(outMove) ? -1 : 1)));
				this.positionAdjusted = true;
			}
		}
	};
	
	// Fire onInit event
	this._fireEvent('onInit');
	
	return this;
};

// Attach jBox to elements
jBox.prototype.attach = function(elements, trigger) {
	elements || (elements = jQuery(this.options.attach.selector || this.options.attach));
	trigger || (trigger = this.options.trigger);
	
	elements && elements.length && jQuery.each(elements, function(index, el) {
		el = jQuery(el);
		if (!el.data('jBox-attached-' + this.id)) {
			
			// Remove title attribute and store content on element
			(this.options.getContent == 'title' && el.attr('title') != undefined) && el.data('jBox-getContent', el.attr('title')).removeAttr('title');
			
			// Add Element to collection
			this.attachedElements || (this.attachedElements = []);
			this.attachedElements.push(el[0]);
			
			// Add click or mouseenter event, click events can prevent default as well
			el.on(trigger + '.jBox-attach-' + this.id, function(ev) {
				// Clear timer
				this.timer && clearTimeout(this.timer);
				
				// Block opening when jbox is open and the source element is triggering
				if (trigger == 'mouseenter' && this.isOpen && this.source[0] == el[0])
					return;
				
				// Only close jBox if you click the current target element, otherwise open at new target
				if (this.isOpen && this.source && this.source[0] != el[0]) var forceOpen = true;
				
				// Set new source element
				this.source = el;
				
				// Set new target
				!this.options.target && (this.target = el);
				
				// Prevent default action on click
				trigger == 'click' && this.options.preventDefault && ev.preventDefault();
				
				// Toggle or open jBox
				this[trigger == 'click' && !forceOpen ? 'toggle' : 'open']();
			}.bind(this));
			
			// Add close event for trigger event mouseenter
			(this.options.trigger == 'mouseenter') && el.on('mouseleave', function(ev) {
				// If we have set closeOnMouseleave, do not close jBox when leaving attached element and mouse is over jBox
				if(!this.options.closeOnMouseleave || !(ev.relatedTarget == this.wrapper[0] || jQuery(ev.relatedTarget).parents('#' + this.id).length)) this.close();
			}.bind(this));
			
			el.data('jBox-attached-' + this.id, trigger);
			
			// Fire onAttach event
			this._fireEvent('onAttach', el);
		}
	}.bind(this));
	
	return this;
};

// Detach jBox from elements
jBox.prototype.detach = function(elements) {
	elements || (elements = this.attachedElements || []);
	
	elements && elements.length && jQuery.each(elements, function(index, el) {
		el = jQuery(el);
		// Remove events
		if (el.data('jBox-attached-' + this.id)) {
			el.off(el.data('jBox-attached-' + this.id) + '.jBox-attach-' + this.id);
			el.data('jBox-attached-' + this.id, null);
		}
		// Remove element from collection
		this.attachedElements = jQuery.grep(this.attachedElements, function(value) {
			return value != el[0];
		});
	}.bind(this));
	
	return this;
};

// Set title
jBox.prototype.setTitle = function(title, ignore_positioning) {
	var wrapperHeight = this.wrapper.height(), wrapperWidth = this.wrapper.width();
	if (title == null || title == undefined) return this;
	!this.wrapper && this._create();
	if (!this.title) {
		this.titleContainer = jQuery('<div/>', {'class': 'jBox-title'});
		this.title = jQuery('<div/>').appendTo(this.titleContainer);
		this.wrapper.addClass('jBox-hasTitle');
		if (this.options.closeButton == 'title' || (this.options.closeButton === true && !this.options.overlay)) {
			this.wrapper.addClass('jBox-closeButton-title');
			this.closeButton.appendTo(this.titleContainer);
		}
		this.titleContainer.insertBefore(this.content);
	}
	this.title.html(title);
	
	// Reposition if dimensions changed
	!ignore_positioning && this.options.repositionOnContent && (wrapperHeight != this.wrapper.height() || wrapperWidth != this.wrapper.width()) && this.position();
	
	return this;
};

// Set content
jBox.prototype.setContent = function(content, ignore_positioning) {
	if (content == null) return this;
	
	// Create jBox if no wrapper found
	!this.wrapper && this._create();
	
	// Get the width and height of wrapper, only if they change we need to reposition
	var wrapperHeight = this.wrapper.height(), wrapperWidth = this.wrapper.width();
	
	// Get the width and height of body, if they change with new content, adjust accordingly (happens when a hidden scrollbar changes body dimensions)
	var bodyHeight = jQuery('body').height(), bodyWidth = jQuery('body').width();
	
	// Extract all appended containers to body
	this.content.children('[data-jbox-content-appended]').appendTo('body').css({display: 'none'});
	
	// Set the new content
	switch (jQuery.type(content)) {
		case 'string': this.content.html(content); break;
		case 'object': this.content.html(''); content.attr('data-jbox-content-appended', 1).appendTo(this.content).css({display: 'block'}); break;
 	}
 	
	// Calculate the difference to before the content was set
	var adjustOffset = {
		x: bodyWidth - jQuery('body').width(),
		y: bodyHeight - jQuery('body').height()
	};
	
	// Reposition if dimensions changed
	!ignore_positioning && this.options.repositionOnContent && (wrapperHeight != this.wrapper.height() || wrapperWidth != this.wrapper.width()) && this.position({adjustOffset: adjustOffset});
	
	return this;
};

// Set new dimensions
jBox.prototype.setDimensions = function(type, val, pos) {
	
	// Create jBox if no wrapper found
	!this.wrapper && this._create();
	
	// Default value is 'auto'
	val == undefined && (val == 'auto');
	
	// Set CSS of content
	this.content.css(type, val);
	
	// Reposition by default
	(pos == undefined || pos) && this.position();
};

// Set width or height
jBox.prototype.setWidth = function(val, pos) { this.setDimensions('width', val, pos); };
jBox.prototype.setHeight = function(val, pos) { this.setDimensions('height', val, pos); };

// Position jBox
jBox.prototype.position = function(options) {
	options || (options = {});
	
	// Get target
	this.target = options.target || this.target || this.options.target || jQuery(window);
	
	// Cache total current dimensions of jBox
	this.dimensions = {
		x: this.wrapper.outerWidth(),
		y: this.wrapper.outerHeight()
	};
	
	// Mousemove can't be positioned
	if (this.target == 'mouse') return;
	
	// Set percent and margin for centered inside
	if (this.options.position.x == 'center' && this.options.position.y == 'center') {
		this.wrapper.css({left: '50%', top: '50%', marginLeft: (this.dimensions.x * -0.5 + this.options.offset.x), marginTop: (this.dimensions.y * -0.5 + this.options.offset.y)});
		return this;
	}
	
	// Total current dimensions of target element
	var targetOffset = this.target.offset();
	
	// Add fixed data to target
	!this.target.data('jBox-fixed') && this.target.data('jBox-fixed', (this.target[0] != jQuery(window)[0] && (this.target.css('position') == 'fixed' || this.target.parents().filter(function() { return jQuery(this).css('position') == 'fixed'; }).length > 0)) ? 'fixed' : 'static');
	
	// When the target is fixed and jBox is fixed, remove scroll offset
	if (this.target.data('jBox-fixed') == 'fixed' && this.options.fixed) {
		targetOffset.top = targetOffset.top - jQuery(window).scrollTop();
		targetOffset.left = targetOffset.left - jQuery(window).scrollLeft();
	}
	
	// Store target dimensions
	this.targetDimensions = {
		x: this.target.outerWidth(),
		y: this.target.outerHeight(),
		top: (targetOffset ? targetOffset.top : 0),
		left: (targetOffset ? targetOffset.left : 0)
	};
	this.pos = {};
	
	// Calculate positions
	var setPosition = function(p) {
		
		// Set number positions
		if (jQuery.inArray(this.options.position[p], ['top', 'right', 'bottom', 'left', 'center']) == -1) {
			this.pos[this.options.attributes[p]] = this.options.position[p];
			return;
		}
		
		// We have a target, so use 'left' or 'top' as attributes
		var a = this.options.attributes[p] = (p == 'x' ? 'left' : 'top');
		
		// Start at target position
		this.pos[a] = this.targetDimensions[a];
		
		// Set centered position
		if (this.options.position[p] == 'center') {
			this.pos[a] += Math.ceil((this.targetDimensions[p] - this.dimensions[p]) / 2);
			return;
		}
		
		// Move inside
		(a != this.options.position[p]) && (this.pos[a] += this.targetDimensions[p] - this.dimensions[p]);
		
		// Move outside
		(this.options.outside == p || this.options.outside == 'xy') && (this.pos[a] += this.dimensions[p] * (a != this.options.position[p] ? 1 : -1));
		
	}.bind(this);
	
	// Set position including offset
	setPosition('x');
	setPosition('y');
	
	// Adjust position depending on pointer align
	if (this.options.pointer && jQuery.type(this.options.position.x) != 'number' && jQuery.type(this.options.position.y) != 'number') {
		
		var adjustWrapper = 0;
		
		// Where is the pointer aligned? Add or substract accordingly
		switch (this.pointer.align) {
			case 'center':
			if (this.options.position[this._getOpp(this.options.outside)] != 'center') {
				adjustWrapper += (this.dimensions[this._getOpp(this.options.outside)] / 2);
			}
			break;
			default:
			switch (this.options.position[this._getOpp(this.options.outside)]) {
				case 'center':
					adjustWrapper += ((this.dimensions[this._getOpp(this.options.outside)] / 2) - (this.pointer.dimensions[this._getOpp(this.options.outside)] / 2)) * (this.pointer.align == this._getTL(this.pointer.align) ? 1 : -1);
				break;
				default:
					adjustWrapper += (this.pointer.align != this.options.position[this._getOpp(this.options.outside)]) ?
						
					// If pointer align is different to position align
					(this.dimensions[this._getOpp(this.options.outside)] * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? 1 : -1)) + ((this.pointer.dimensions[this._getOpp(this.options.outside)] / 2) * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? -1 : 1)) :
						
					// If pointer align is same as position align
					(this.pointer.dimensions[this._getOpp(this.options.outside)] / 2) * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? 1 : -1);
				break;
			}
			break;
		}
		adjustWrapper *= (this.options.position[this._getOpp(this.options.outside)] == this.pointer.alignAttribute ? -1 : 1);
		adjustWrapper += this.pointer.offset * (this.pointer.align == this._getOpp(this._getTL(this.pointer.align)) ? 1 : -1);
		
		this.pos[this._getTL(this._getOpp(this.pointer.xy))] += adjustWrapper;
	}
	
	// Add adjustments
	options.adjustOffset && options.adjustOffset.x && (this.pos[this.options.attributes.x] += parseInt(options.adjustOffset.x) * (this.options.attributes.x == 'left' ? 1 : -1));
	options.adjustOffset && options.adjustOffset.y && (this.pos[this.options.attributes.y] += parseInt(options.adjustOffset.y) * (this.options.attributes.y == 'top' ? 1 : -1));
	
	// Add final offset
	this.pos[this.options.attributes.x] += this.options.offset.x;
	this.pos[this.options.attributes.y] += this.options.offset.y;
	
	// Set CSS
	this.wrapper.css(this.pos);
	
	// Adjust position
	this._adjustPosition();
	
	return this;
};

// Open jBox
jBox.prototype.open = function(options) {
	options || (options = {});
	
	// Abort if jBox was destroyed
	if (this.isDestroyed) return false;
	
	// Construct jBox if not already constructed
	!this.wrapper && this._create();
	
	// Abort any opening or closing timer
	this.timer && clearTimeout(this.timer);
	
	// Block body click for 10ms, so jBox can open on attached elements while closeOnClick = 'body'
	this._blockBodyClick();
	
	// Block opening
	if (this.isDisabled) return this;
	
	// Opening function
	var open = function() {
		
		// Set title from source element
		this.source && this.options.getTitle && (this.source.attr(this.options.getTitle) && this.setTitle(this.source.attr(this.options.getTitle)), true);
		
		// Set content from source element
		this.source && this.options.getContent && (this.source.data('jBox-getContent') ? this.setContent(this.source.data('jBox-getContent'), true) : (this.source.attr(this.options.getContent) ? this.setContent(this.source.attr(this.options.getContent), true) : null));
		
		// Fire onOpen event
		this._fireEvent('onOpen');
		
		// Get content from ajax
		((this.options.ajax && this.options.ajax.url && (!this.ajaxLoaded || this.options.ajax.reload)) || (options.ajax && options.ajax.url)) && this.ajax(options.ajax || null);
		
		// Set position
		(!this.positionedOnOpen || this.options.repositionOnOpen) && this.position({target: options.target}) && (this.positionedOnOpen = true);
		
		// Abort closing
		this.isClosing && this._abortAnimation();
		
		// Open functions to call when jBox is closed
		if (!this.isOpen) {
			
			// jBox is open now
			this.isOpen = true;
			
			// Attach events
			this._attachEvents();
			
			// Block scrolling
			this.options.blockScroll && jQuery('body').addClass('jBox-blockScroll-' + this.id);
			
			// Add overlay
			this.options.overlay && this._addOverlay();
			
			// Only animate if jBox is compleately closed
			this.options.animation && !this.isClosing && this._animate('open');
			
			// Fading animation or show immediately
			if (this.options.fade) {
				this.wrapper.stop().animate({opacity: 1}, {
					queue: false,
					duration: this.options.fade,
					start: function() {
						this.isOpening = true;
						this.wrapper.css({display: 'block'});
					}.bind(this),
					always: function() {
						this.isOpening = false;
					}.bind(this)
				});
			} else {
				this.wrapper.css({display: 'block', opacity: 1});
			}
		}
	}.bind(this);
	
	// Open jBox
	this.options.delayOpen && !this.isOpen && !this.isClosing && !options.ignoreDelay ? (this.timer = setTimeout(open, this.options.delayOpen)) : open();
	
	return this;
};

// Close jBox
jBox.prototype.close = function(options) {
	options || (options = {});
	
	// Abort if jBox was destroyed
	if (this.isDestroyed) return false;
	
	// Abort opening
	this.timer && clearTimeout(this.timer);
	
	// Block body click for 10ms, so jBox can open on attached elements while closeOnClock = 'body' is true
	this._blockBodyClick();
	
	// Block closing
	if (this.isDisabled) return this;
	
	// Close function
	var close = function() {
		
		// Fire onClose event
		this._fireEvent('onClose');
		
		// Only close if jBox is open
		if (this.isOpen) {
			
			// jBox is not open anymore
			this.isOpen = false;
			
			// Detach events
			this._detachEvents();
			
			// Unblock scrolling
			this.options.blockScroll && jQuery('body').removeClass('jBox-blockScroll-' + this.id);
			
			// Remove overlay
			this.options.overlay && this._removeOverlay();
			
			// Only animate if jBox is compleately closed
			this.options.animation && !this.isOpening && this._animate('close');
			
			// Fading animation or show immediately
			if (this.options.fade) {
				this.wrapper.stop().animate({opacity: 0}, {
					queue: false,
					duration: this.options.fade,
					start: function() {
						this.isClosing = true;
					}.bind(this),
					complete: function() {
						this.wrapper.css({display: 'none'});
						this.options.onCloseComplete && (this.options.onCloseComplete.bind(this))();
						this.options._onCloseComplete && (this.options._onCloseComplete.bind(this))();
					}.bind(this),
					always: function() {
						this.isClosing = false;
					}.bind(this)
				});
			} else {
				this.wrapper.css({display: 'none', opacity: 0});
				this.options._onCloseComplete && (this.options._onCloseComplete.bind(this))();
			}
		}
	}.bind(this);
	
	// Close jBox
	options.ignoreDelay ? close() : (this.timer = setTimeout(close, Math.max(this.options.delayClose, 10)));
	
	return this;
};

// Open or close jBox
jBox.prototype.toggle = function(options) {
	this[this.isOpen ? 'close' : 'open'](options);
	return this;
};

// Block opening and closing
jBox.prototype.disable = function() {
	this.isDisabled = true;
	return this;
};

// Unblock opening and closing
jBox.prototype.enable = function() {
	this.isDisabled = false;
	return this;
};

// Get content from ajax
jBox.prototype.ajax = function(options) {
	options || (options = {});
	
	// Add data from source element if none set in options
	(this.options.ajax.getData && !options.data && this.source && this.source.attr(this.options.ajax.getData) != undefined) && (options.data = this.source.attr(this.options.ajax.getData) || '');
	
	// Clone the system options
	var sysOptions = jQuery.extend(true, {}, this.options.ajax);
	
	// Abort running ajax call
	this.ajaxRequest && this.ajaxRequest.abort();
	
	// Extract events
	var beforeSend = options.beforeSend || sysOptions.beforeSend || function () {};
	var complete = options.complete || sysOptions.complete || function () {};
	
	// Merge options
	var userOptions = jQuery.extend(true, sysOptions, options);
	
	// Set new beforeSend event
	userOptions.beforeSend = function () {
		
		// Add loading spinner
		if (userOptions.spinner) {
			this.wrapper.addClass('jBox-loading');
			this.spinner = jQuery(userOptions.spinner !== true ? userOptions.spinner : '<div class="jBox-spinner"></div>').appendTo(this.container);
		}
		
		(beforeSend.bind(this))();
	}.bind(this);
	
	// Set new complete event
	userOptions.complete = function (response) {
		
		// Remove spinner
		this.wrapper.removeClass('jBox-loading');
		this.spinner && this.spinner.remove();
		
		// Set new content
		userOptions.setContent && this.setContent(response.responseText);
		
		this.ajaxLoaded = true;
		
		(complete.bind(this))(response);
	}.bind(this);
	
	// Send new ajax request
	this.ajaxRequest = jQuery.ajax(userOptions);
	
	return this;
};

// Play an audio file
jBox.prototype.audio = function(options) {
	options || (options = {});
	jBox._audio || (jBox._audio = {});
	
	// URL required, no IE8 support
	if (!options.url || this.IE8) return this;
	
	// Create audio if it doesn't exist
	if (!jBox._audio[options.url]) {
		var audio = jQuery('<audio/>');
		jQuery('<source/>', {src: options.url + '.mp3'}).appendTo(audio);
		jQuery('<source/>', {src: options.url + '.ogg'}).appendTo(audio);
		jBox._audio[options.url] = audio[0];
	}
	
	// Set volume and play audio
	jBox._audio[options.url].volume = Math.min((options.volume != undefined ? options.volume : (this.options.volume != undefined ? this.options.volume : 100) / 100), 1);
	jBox._audio[options.url].pause();
	try { jBox._audio[options.url].currentTime = 0; } catch (e) {}
	jBox._audio[options.url].play();
	
	return this;
};

// Destroy jBox and remove it from DOM
// TODO: If no other jBox needs an overlay remove it as well
jBox.prototype.destroy = function() {
	this.detach().close({ignoreDelay: true});
	this.wrapper && this.wrapper.remove();
	this.isDestroyed = true;
	return this;
};

// TODO: Find an option to preload audio files

// Get a unique ID for jBoxes
jBox._getUniqueID = (function () {
	var i = 1;
	return function () {
		return i++;
	};
}());

// Make jBox usable with jQuery selectors
jQuery.fn.jBox = function(type, options) {
	type || (type = {});
	options || (options = {});
	return new jBox(type, jQuery.extend(options, {attach: this}));
};

// Add the .bind() function for IE 8 support
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {},
			fBound = function () { return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments))); };
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}

function emailsala() {
  var linksalatim = document.getElementById("EMAILSALATIM").value;
  document.getElementById("salatim").innerHTML = linksalatim;
}

function normal() {
  var corpo = 
  "TICKET: " + document.getElementById("TICKET").value + "<br>" + 
  " Valor NF: R$" + document.getElementById("VALORNF").value + "<br>" + 
  " Modal: " + document.getElementById("MODAL").value + "<br>" + 
  "SGS:" + document.getElementById("ETICKET").value + "<br>" + "Distância: " + document.getElementById("KM").value + " Km" +"<br><br>" + 
  " Coleta: " + document.getElementById("COLETA").value + "<br>" + 
  " Contato coleta: " + document.getElementById("CONTATOCOLETA").value + "<br><br>" + 
  " Entrega: " + document.getElementById("ENTREGA").value + "<br>" + 
  " Contato entrega: " + document.getElementById("CONTATOENTREGA").value + "<br><br>" +
  " Altura: " + document.getElementById("ALTURA").value + " cm <br>" + 
  " Largura: " + document.getElementById("LARGURA").value + " cm" + "<br>" + 
  " Comprimento: " + document.getElementById("COMPRIMENTO").value + " cm" + "<br><br>" + 
  " Peso: " + document.getElementById("PESO").value + " kg" + "<br>" + 
  " Volume: " + document.getElementById("VOLUME").value + " " + document.getElementById("TIPOVOLUME").value + "<br><br>";
  var tcoleta = "Data da Coleta: ";
var xcoleta = document.getElementById("datacoleta").value;
var dcoleta = xcoleta[8]+xcoleta[9]+"/"+xcoleta[5]+xcoleta[6]+"/"+xcoleta[0]+xcoleta[1]+xcoleta[2]+xcoleta[3] + "<br>";
var tentrega = "Data da Entrega: ";
var xentrega = document.getElementById("dataentrega").value;
var dentrega = xentrega[8]+xentrega[9]+"/"+xentrega[5]+xentrega[6]+"/"+xentrega[0]+xentrega[1]+xentrega[2]+xentrega[3] + "<br><br>";
  var corpox1 = corpo.toUpperCase();
  if (xcoleta < 1) {
	  document.getElementById("normaldemo").innerHTML = corpox1;
	  } else {
if (xentrega < 1) {
	document.getElementById("normaldemo").innerHTML = corpox1;
} else {
  document.getElementById("normaldemo").innerHTML = corpox1+tcoleta+dcoleta+tentrega+dentrega;
}}}



function emergencial() {
  var x = 
  "🚨🚨🚨 EMERGENCIAL 🚨🚨🚨" + 
  "<br>" + 
  "TICKET: " + document.getElementById("TICKET").value + "<br>" + 
  " Valor NF: R$ " + document.getElementById("VALORNF").value + "<br>" + 
  " Modal: " + document.getElementById("MODAL").value + "<br>" + 
  "Solicitação Nº: " + document.getElementById("ETICKET").value + "<br>" + "Distância: " + document.getElementById("KM").value + " Km" +"<br><br>" + 
  " Coleta: " + document.getElementById("COLETA").value + "<br>" + 
  " Contato coleta: " + document.getElementById("CONTATOCOLETA").value + "<br><br>" + 
  " Entrega: " + document.getElementById("ENTREGA").value + "<br>" + 
  " Contato entrega: " + document.getElementById("CONTATOENTREGA").value + "<br><br>" +
  " Altura: " + document.getElementById("ALTURA").value + " cm <br>" + 
  " Largura: " + document.getElementById("LARGURA").value + " cm" + "<br>" + 
  " Comprimento: " + document.getElementById("COMPRIMENTO").value + " cm" + "<br><br>" + 
  " Peso: " + document.getElementById("PESO").value + " kg" + "<br>" + 
  " Volume: " + document.getElementById("VOLUME").value + " " + document.getElementById("TIPOVOLUME").value + "<br><br>";
  var tcoleta = "Data da Coleta: ";
var xcoleta = document.getElementById("datacoleta").value;
var dcoleta = xcoleta[8]+xcoleta[9]+"/"+xcoleta[5]+xcoleta[6]+"/"+xcoleta[0]+xcoleta[1]+xcoleta[2]+xcoleta[3] + "<br>";
var tentrega = "Data da Entrega: ";
var xentrega = document.getElementById("dataentrega").value;
var dentrega = xentrega[8]+xentrega[9]+"/"+xentrega[5]+xentrega[6]+"/"+xentrega[0]+xentrega[1]+xentrega[2]+xentrega[3] + "<br><br>";
  var d =
  "*CONSEGUEM ATENDER?*";
  var x1 = x.toUpperCase();
  if (xcoleta < 1) {
	  document.getElementById("emergencialdemo").innerHTML = x1+d;
	  	  } else {
    if (xentrega < 1) {
  document.getElementById("emergencialdemo").innerHTML = x1+d;
} else {
  document.getElementById("emergencialdemo").innerHTML = x1+tcoleta+dcoleta+tentrega+dentrega+d;
}}}

function download(){
    var text = document.getElementById("blocodenotas").value;
    text = text.replace(/\n/g, "\r\n");
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "Minhas anotações" + " do TICKET-" + document.getElementById("TICKET").value + " - " +document.getElementById("NTICKET").value;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
 }
 
 function myFunction() {
  var text;
  var Senha = prompt("Digite aquela senha lá... sabe... aquela lá...", "");
  switch(Senha) {
    case "@Merinode10":
       var x = document.getElementById("myOption").value;
	   break;
    default:
      alert("...");
  }
  document.getElementById("coletaeentrega").innerHTML = x;
}
 
 function mantenedor() {
  var text;
  var MantenedorSenha = prompt("Digite aquela senha e eu prometo que mostro o codigo do mantenedor...", "");
switch(MantenedorSenha) {
    case "@Merinode10":
	var text;
  var CodigoM = document.getElementById("XMANTENEDOR").value;
  switch(CodigoM) {
	  case "ABILITY - ITABUNA - BA":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ABILITY - ITABUNA - BA</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063996</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. EVARISTO ANDRADE, 66 - NOSSA SRA.&nbsp;&nbsp;&nbsp;DA CONCEIÇÃO, ITABUNA - BA, 45605-005</td></tr><tr><td>CNPJ:</td><td>06.127.582/0028-78</td></tr><tr><td>Telefone:</td><td>JOSE 8199532-6459</td></tr></tbody></table></div>";
	   break;
	  case "ABILITY - ARACAJU - SE":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ABILITY - ARACAJU - SE</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063995</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. SANTA LUZIA, 811 - SÃO JOSÉ,&nbsp;&nbsp;&nbsp;ARACAJU - SE, 49015-190</td></tr><tr><td>CNPJ:</td><td>06.127.582/0021-00</td></tr><tr><td>Telefone:</td><td>CRISTIANO 8199982-6745</td></tr></tbody></table></div>";
	   break;
	   case "ABILITY - SALVADOR - BA":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ABILITY - SALVADOR - BA</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063392</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA DA INDONESIA, 500 - GRANJAS RURAIS, PRESIDENTE VARGAS - BA, 41230-020</td></tr><tr><td>CNPJ:</td><td>06.127.582/0014-72</td></tr><tr><td>Telefone:</td><td>ROBERTO 8198295-1400/FABIANO 7199167-3100</td></tr></tbody></table></div>";
	   break;
	   case "ABILITY - OLINDA - PE":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ABILITY - OLINDA - PE</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063358</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para&nbsp;&nbsp;&nbsp;envio de unidades:</td><td>RUA PROF. AGAMENON MAGALHÃES, 400A -&nbsp;&nbsp;&nbsp;VILA POPULAR, OLINDA - PE, 53110-710</td></tr><tr><td>CNPJ:</td><td>06.127.582/0013-91</td></tr><tr><td>Telefone:</td><td>ADEILDON 8198172-7511 / KLEYTON&nbsp;&nbsp;&nbsp;8198172-7847 / MARCELO 8199982-9580</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - BELO HORIZONTE - MG":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - BELO HORIZONTE - MG</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053762</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. PORTUGAL, 757 - JARDIM ATLÂNTICO,&nbsp;&nbsp;&nbsp;BELO HORIZONTE - MG, 31550-000</td></tr><tr><td>CNPJ:</td><td></td></tr><tr><td>Telefone:</td><td></td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - BRASÍLIA - DF":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - BRASÍLIA - DF</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053878</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>CSG QD 5, LT 7 - TAGUATINGA SUL,&nbsp;&nbsp;&nbsp;BRASÍLIA - DF, 72035-505</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>RONNEY 6199370-2071</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - CAMPO GRANDE - MS":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - CAMPO GRANDE - MS</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055018</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. TIRADENTES, 858 - VILA&nbsp;&nbsp;&nbsp;TAVEIROPOLIS, CAMPO GRANDE - MS, 79090-000</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>THYAGO 6798213-0082 / ANTONIO&nbsp;&nbsp;&nbsp;6798213-0063</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - CUIABÁ - MT":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - CUIABÁ - MT</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055019</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA GOVERNADOR PEDRO PEDROSSIAM, 388 -&nbsp;&nbsp;&nbsp;CAMPO VELHO, CUIABÁ - MT, 78065-260</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>BRUNO 6599204-1831 / WESLEY&nbsp;&nbsp;&nbsp;6599275-9985</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - GOIÂNIA - GO":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - GOIÂNIA - GO</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055005</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA 16, QD50 LT12 - JARDIM SANTO&nbsp;&nbsp;&nbsp;ANTÔNIO - GOIÂNIA - GO, 74853-290</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>EMERSON 6299231-9776</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - MACEIÓ - AL":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - MACEIÓ - AL</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3054234</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. DES. BARRETO CARDOSO, 282 - GRUTA&nbsp;&nbsp;&nbsp;DE LOURDES, MACEIÓ - AL, 57052-850</td></tr><tr><td>CNPJ:</td><td>08.162.032/0019-24</td></tr><tr><td>Telefone:</td><td>JANILSON 8299992-2347</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - MESSEJANA - CE":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - MESSEJANA - CE</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3052391</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA CORONEL ALVES RIBEIRO, 111 B -&nbsp;&nbsp;&nbsp;MESSEJANA, FORTALEZA - CE, 60842-220</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>BRUNO 8599912-1653</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - NATAL - RN":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - NATAL - RN</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053835</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA MANOEL DA COSTA SOUZA , 236 -&nbsp;&nbsp;&nbsp;NEOPOLIS, NATAL - RN, 59086-330</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>MARCOS 8499132-3239</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - PALMAS - TO":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - PALMAS - TO</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055006</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>QUADRA 204 SUL, ALAMEDA 02, LOTE 44 -&nbsp;&nbsp;&nbsp;PLANO DIRETOR SUL, PALMAS - TO, 77020-494</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>GILVAN 6398119-0129</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - PARNAMIRIM - PE":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - PARNAMIRIM - PE</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3052605</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA PADRE ROMA, 1601 B - PARNAMIRIM,&nbsp;&nbsp;&nbsp;RECIFE - PE, 52060-060</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td> </td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - PORTO VELHO - RO":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - PORTO VELHO - RO</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055023</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA OSÓRIO ALBURQUERQUE, 5017 - AGENOR&nbsp;&nbsp;&nbsp;CARVALHO, PORTO VELHO - RO, 76820-292</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>SILMAR 6999275-6568</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - RIO BRANCO - AC":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - RIO BRANCO - AC</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055025</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>TRAVESSA REPÚBLICA, 144 - ESTACAO&nbsp;&nbsp;&nbsp;EXPERIMENTAL, RIO BRANCO - AC, 69918-270</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>OSCAR 6898110-0023 / 6899283-5837</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - SE":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - SE</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3054001</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td> </td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td> </td></tr></tbody></table></div>";
	   break;
	   case "ALGAR - TERESINA - PI":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR - TERESINA - PI</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055017</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA DEPUTADO LAURENTINO NETO, 481 -&nbsp;&nbsp;&nbsp;FÁTIMA, TERESINA - PI, 64049-350</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>RAIMUNDO 8699968-0173</td></tr></tbody></table></div>";
	   break;
	   case "ALGAR -SALVADOR - BA":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>ALGAR -SALVADOR - BA</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053764</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA JORGE NOVIS, 151, QD A, LT 18A -&nbsp;&nbsp;&nbsp;VILA LAURA, SALVADOR - BA, 40270-370 </td></tr><tr><td>CNPJ:</td><td>08.162.032/0031-10</td></tr><tr><td>Telefone:</td><td>MANOEL 7199167-3100</td></tr></tbody></table></div>";
	   break;
	   case "EZENTIS - CANOAS - RS":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>EZENTIS - CANOAS - RS</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053175</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA ANDRÉ NICHELE, 301 - MATO GRANDE,&nbsp;&nbsp;&nbsp;CANOAS - RS, 92320-030</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>JONATHAN 5199872-6460</td></tr></tbody></table></div>";
	   break;
	   case "EZENTIS - PARQUE LAFAIETE - RJ":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>EZENTIS - PARQUE LAFAIETE - RJ</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063177</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. PREF. RIBEIRO, 950 - PARQUE&nbsp;&nbsp;&nbsp;LAFAIETE, DUQUE DE CAXIAS - RJ, 25015-327</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>GENILSON 2198142-2976 / MARCOS&nbsp;&nbsp;&nbsp;2198153-3510 / VAGNER 2197281-7951 / LEONEL 1197380-3962</td></tr></tbody></table></div>";
	   break;
	   case "EZENTIS - PINHAIS - PR":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>EZENTIS - PINHAIS - PR</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063378</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA RIO AZUL, 247 - EMILIANO PERNETA,&nbsp;&nbsp;&nbsp;PINHAIS - PR, 83325-110</td></tr><tr><td>CNPJ:</td><td>05.823.631/0009-81</td></tr><tr><td>Telefone:</td><td> </td></tr></tbody></table></div>";
	   break;
	   case "EZENTIS - SÃO JOSÉ - SC":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>EZENTIS - SÃO JOSÉ - SC</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3054829</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>TRAVESSA NELSON MIGUEL DA SILVA, 19 -&nbsp;&nbsp;&nbsp;SERRARIA, SÃO JOSE - SC, 88115-235</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>DJALMA 4899808-1081</td></tr></tbody></table></div>";
	   break;
	   case "TEL - BAURU - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - BAURU - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3033178</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. MANOEL DUQUE, 4-70 - JARDIM&nbsp;&nbsp;&nbsp;GUADALAJARA, BAURU - SP, 17030-110</td></tr><tr><td>CNPJ:</td><td>06.084.614/0002-66</td></tr><tr><td>Telefone:</td><td>MAURICIO 1498201-0833 / EVANDRO BARELA&nbsp;&nbsp;&nbsp;1998409-0076</td></tr></tbody></table></div>";
	   break;
	   case "TEL - BELEM - PA":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - BELEM - PA</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053771</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RODOVIA BR-316 KM 04, S/N - GUANABARA,&nbsp;&nbsp;&nbsp;ANANINDEUA - PA, 67110-000</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>CLEISON NOE 9199335-9498</td></tr></tbody></table></div>";
	   break;
	   case "TEL - BOA VISTA - RR":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - BOA VISTA - RR</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3054725</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. GETÚLIO VARGAS, 3684 - CANARINHO,&nbsp;&nbsp;&nbsp;BOA VISTA - RR, 69306-545</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>WARLLEN RONALD 9598108-6261</td></tr></tbody></table></div>";
	   break;
	   case "TEL - BRASÍLIA - DF":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - BRASÍLIA - DF</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063192</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>ADE CONJUNTO 25, 25, LT 03 - ÁREA DE&nbsp;&nbsp;&nbsp;DESENVOLVIMENTO ECONÔMICO (ÁGUAS CLARAS), BRASÍLIA - DF, 71990-541</td></tr><tr><td>CNPJ:</td><td>06.084.614/0015-80</td></tr><tr><td>Telefone:</td><td>MARCOS CAETANO 6199943-3583 / MARCUS&nbsp;&nbsp;&nbsp;VINICIUS 6199642-3458 / VANDERSON 6199691-9489</td></tr></tbody></table></div>";
	   break;
	   case "TEL - CAMPO GRANDE - MS":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - CAMPO GRANDE - MS</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063224</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA BUENOS AIRES, 314 - VILA&nbsp;&nbsp;&nbsp;MARGARIDA, CAMPO GRANDE - MS, 79023-210</td></tr><tr><td>CNPJ:</td><td>06.084.614/0014-08</td></tr><tr><td>Telefone:</td><td>ALEXANDRE&nbsp;&nbsp;&nbsp;6799987-0917 / EMERSON 6799636-2378</td></tr></tbody></table></div>";
	   break;
	   case "TEL - CUBATÃO - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - CUBATÃO - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053770</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. NOSSA SRA. DE FÁTIMA, 1172 -&nbsp;&nbsp;&nbsp;CASQUEIRO, CUBATÃO - SP, 11530-030</td></tr><tr><td>CNPJ:</td><td>06.084.614/0018-23</td></tr><tr><td>Telefone:</td><td>PEDRO 1398168-1135 / EVANDRO BARELA&nbsp;&nbsp;&nbsp;1998409-0076</td></tr></tbody></table></div>";
	   break;
	   case "TEL - CUIABÁ - MT":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - CUIABÁ - MT</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063225</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. FERNANDO CORREIA DA COSTA, 6635 -&nbsp;&nbsp;&nbsp;SÃO JOSÉ, CUIABÁ - MT, 78085-700</td></tr><tr><td>CNPJ:</td><td>06.084.614/001-157</td></tr><tr><td>Telefone:</td><td>ANDERSON&nbsp;&nbsp;&nbsp;6598131-0084 / VALDETINA 6599989-6257</td></tr></tbody></table></div>";
	   break;
	   case "TEL - GUARULHOS - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - GUARULHOS - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063798</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. SÃO MATEUS DO MARANHÃO, 183 -&nbsp;&nbsp;&nbsp;CUMBICA, GUARULHOS - SP, 07222-140</td></tr><tr><td>CNPJ:</td><td>06.084.614/0026-33</td></tr><tr><td>Telefone:</td><td>VICTOR 1198435-7353 MICHAEL&nbsp;&nbsp;&nbsp;1197794-0137</td></tr></tbody></table></div>";
	   break;
	   case "TEL - GOIANIA - GO":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - GOIANIA - GO</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063176</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AVENIDA PRIMEIRA AVENIDA, QD 01B, LT.&nbsp;&nbsp;&nbsp;27 - COND. CIDADE EMPRESARIAL, APARECIDA DE GOIÂNIA - GO, 74935-900</td></tr><tr><td>CNPJ:</td><td>06.084.614/0017-42</td></tr><tr><td>Telefone:</td><td>MARCOS ROBERTO 6299992-7051 / EMERSON&nbsp;&nbsp;&nbsp;SOUZA 6298271-7759</td></tr></tbody></table></div>";
	   break;
	   case "TEL - JUNDIAÍ - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - JUNDIAÍ - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053770</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. ANTONIETA PIVA BARRANQUEIROS, 295&nbsp;&nbsp;&nbsp;- ST. INDUSTRIAL, JUNDIAÍ - SP, 13213-009</td></tr><tr><td>CNPJ:</td><td>06.084.614/0018-23</td></tr><tr><td>Telefone:</td><td>MARCELO CALIXTO  1197558-2168</td></tr></tbody></table></div>";
	   break;
	   case "TEL - JURUBATUBA - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - JURUBATUBA - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053770</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. DAS BAIADEIRAS, 290 - JURUBATUBA,&nbsp;&nbsp;&nbsp;SÃO PAULO - SP, 04675-210</td></tr><tr><td>CNPJ:</td><td>06.084.614/0018-23</td></tr><tr><td>Telefone:</td><td>JHENIFFER 1993004-3169 / EVANDRO&nbsp;&nbsp;&nbsp;BARELA 1998409-0076</td></tr></tbody></table></div>";
	   break;
	   case "TEL - MACAPÁ - AP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - MACAPÁ - AP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3055195</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. PALMAS, 670 - INFRAERO, MACAPÁ -&nbsp;&nbsp;&nbsp;AP, 68908-033</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>EVERTON CUNHA 9698142-0442</td></tr></tbody></table></div>";
	   break;
	   case "TEL - MANAUS - AM":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - MANAUS - AM</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053772</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. URUCARÁ, 986 - CACHOEIRINHA,&nbsp;&nbsp;&nbsp;MANAUS - AM, 69065-180</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>ADRIANO 9298193-9394 / RENATO COSTA&nbsp;&nbsp;&nbsp;9298193-5062</td></tr></tbody></table></div>";
	   break;
	   case "TEL - PALMAS - TO":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - PALMAS - TO</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063188</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>QUADRA 103 SUL RUA SO 5 LT 13 SALA 02&nbsp;&nbsp;&nbsp;- PLANO DIRETOR SUL, PALMAS - TO, 77015-018</td></tr><tr><td>CNPJ:</td><td>06.084.614/0012-38</td></tr><tr><td>Telefone:</td><td>LEANDRO 6399994-8871</td></tr></tbody></table></div>";
	   break;
	   case "TEL - PIRACICABA - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - PIRACICABA - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053768</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. JOSÉ DO PATROCÍNIO, 205 - JARDIM&nbsp;&nbsp;&nbsp;CALIFORNIA, PIRACICABA - SP, 13424-565</td></tr><tr><td>CNPJ:</td><td>06.084.614/0010-76</td></tr><tr><td>Telefone:</td><td>FLAVIO ROSSINI 1998409-0791 / EVANDRO&nbsp;&nbsp;&nbsp;BARELA 1998409-0076</td></tr></tbody></table></div>";
	   break;
	   case "TEL - PORTO VELHO - RO":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - PORTO VELHO - RO</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063226</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA PAULO LEAL, 1622 - NOSSA SENHORA&nbsp;&nbsp;&nbsp;DAS GRAÇAS, PORTO VELHO - RO, 76804-146</td></tr><tr><td>CNPJ:</td><td>06.084.614/001-319</td></tr><tr><td>Telefone:</td><td>LUAN 6999937-0605</td></tr></tbody></table></div>";
	   break;
	   case "TEL - RIBEIRÃO PRETO - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - RIBEIRÃO PRETO - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053767</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. MAL. COSTA E SILVA, 2315 - CAMPOS&nbsp;&nbsp;&nbsp;ELÍSIOS, RIBEIRÃO PRETO - SP, 14080-130</td></tr><tr><td>CNPJ:</td><td>06.084.614/0008-51</td></tr><tr><td>Telefone:</td><td>FELIPE CANATO 1699961-8242</td></tr></tbody></table></div>";
	   break;
	   case "TEL - RIO BRANCO - AC":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - RIO BRANCO - AC</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3063247</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. SILVESTRE COELHO, 773 - BOSQUE, RIO&nbsp;&nbsp;&nbsp;BRANCO - AC, 69900-661</td></tr><tr><td>CNPJ:</td><td>06.084.614/0016-61</td></tr><tr><td>Telefone:</td><td>JHONATAN TALINCO 6899607-3707</td></tr></tbody></table></div>";
	   break;
	   case "TEL - SÃO JOSÉ DOS CAMPOS - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - SÃO JOSÉ DOS CAMPOS - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053770</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. LUCÉLIA, 864 - CHÁCARAS REUNIDAS,&nbsp;&nbsp;&nbsp;SÃO JOSÉ DOS CAMPOS - SP, 12238-450</td></tr><tr><td>CNPJ:</td><td>06.084.614/0018-23</td></tr><tr><td>Telefone:</td><td>GILSON 1298171-2478 / EVANDRO BARELA&nbsp;&nbsp;&nbsp;1998409-0076</td></tr></tbody></table></div>";
	   break;
	   case "TEL - SÃO JOSÉ RIO PRETO - SP":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - SÃO JOSÉ RIO PRETO - SP</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053767</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA WILK FERREIRA DE SOUZA, 180 -&nbsp;&nbsp;&nbsp;DISTRITO INDUSTRIAL WALDEMAR DE OLIVEIRA VERDI, SÃO JOSÉ DO RIO PRETO - SP,&nbsp;&nbsp;&nbsp;15035-510</td></tr><tr><td>CNPJ:</td><td>06.084.614/0008-51</td></tr><tr><td>Telefone:</td><td>GRACIELI 1798211-0955 / EVANDRO BARELA&nbsp;&nbsp;&nbsp;1998409-0076</td></tr></tbody></table></div>";
	   break;
	   case "TEL - SÃO LUIS - MA":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TEL - SÃO LUIS - MA</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3053761</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. BRISA MAR, LOTES 3 E 4, QUADRA 25&nbsp;&nbsp;&nbsp;- ARAÇAGI, SÃO LUIS - MA, 65068-128</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>FRANCISCO 9899229-9017</td></tr></tbody></table></div>";
	   break;
	   case "TLP - MANGUINHOS - RJ":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TLP - MANGUINHOS - RJ</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3062891</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>AV. DOM HÉLDER CÂMARA, 199 -&nbsp;&nbsp;&nbsp;MANGUINHOS, RIO DE JANEIRO - RJ, 20911-291</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>KENI 2299759-5360</td></tr></tbody></table></div>";
	   break;
	   case "TLP - SERRA - ES":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TLP - SERRA - ES</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3062919</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. CURITIBA - ALTEROSAS, SERRA - ES,&nbsp;&nbsp;&nbsp;29167-031</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>CRISTIANO 2799824-0864</td></tr></tbody></table></div>";
	   break;
	   case "TLP -BELO HORIZONTE - MG":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TLP -BELO HORIZONTE - MG</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3062833</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>RUA HÉLIO LAZZAROTTI, 497 - ALTO&nbsp;&nbsp;&nbsp;CAIÇARAS, BELO HORIZONTE - MG, 30750-270</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>LUCAS 3199131-0611</td></tr></tbody></table></div>";
	   break;
	   case "TLP -VARGINHA - MG":
       var exibirmantenedor = "<div class='tabela'><table><thead><tr><th>Reparador:</th><th>TLP -VARGINHA - MG</th></tr></thead><tbody><tr><td>Código SAP:</td><td>3062890</td></tr><tr><td>OBS Cód Sap:</td><td>Mantenedor</td></tr><tr><td>Endereço para envio de unidades:</td><td>R. JOÃO LEITE ALVARENGA, 115 - VILA&nbsp;&nbsp;&nbsp;VERONICA, VARGINHA - MG, 37026-486</td></tr><tr><td>CNPJ:</td><td> </td></tr><tr><td>Telefone:</td><td>ARIMATEIA 3199131-3383</td></tr></tbody></table></div>";
	   break;
	   
	   
    default:
	alert("Não");
	break;
  }
  document.getElementById("cmantenedor").innerHTML = exibirmantenedor;
}
}

function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
