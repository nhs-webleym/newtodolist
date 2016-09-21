		$(document).ready(function() {
			var newListItem;
			var newList = true;
			var theList = document.getElementById('toDoList');
			$('#addToDo').on('click', function(e) {
					e.preventDefault();
				if(!$('#toDoItem').val()){
					alert("enter something");
				}else{
					if (newList == true) {
						var theValue = $("#toDoItem").val();
						newListItem = '<li><input class="listItem form-control" value="' + theValue + '"><span class="handle"><i class="fa fa-arrows-v" aria-hidden="true"></i></span> <a class="removeListItem" style="display: none;" href="#"> <i class="fa fa-times" aria-hidden="true"></i> </a> </li>';
						newList = false;	
					} else {
						var theValue = $("#toDoItem").val();
					    newListItem = $('#toDoList li:last').clone();
						newListItem.find('input').attr('value', theValue); 
					}
					var theCount = $("#toDoList li").length + 1;
					if (theCount > 1) {
						$('#doClearAll').css('display','block');
					}
					$('#toDoList').append(newListItem);
					$('#toDoItem').val('');
					$('#toDoItem').focus();
					$('.sortable').sortable('destroy');
					$('.sortable').sortable({
						handle: '.handle'
					});
					localStorage.setItem('todoListPlus', theList.innerHTML);
				}
			});
			$('input[type="text"]').on('keydown', function(e) {

				var key = e.keyCode || e.which;
				if (key == 13) {
				e.preventDefault();

					$('#addToDo').click();
				}
			});
			$('#toDoList').on('change', '.listItem', function(e) {
				currentValue = $(this).val();
				$(this).attr('value', currentValue);
				localStorage.setItem('todoListPlus', theList.innerHTML);
			});
			$('.sortable').sortable().bind('sortupdate', function() {
				localStorage.setItem('todoListPlus', theList.innerHTML);
			});
			$('#toDoList').on('mouseover', 'li', function(){
				var $removeButton = $(this).find('a');
				$removeButton.css('display', 'inline-block');
			});
			$('#toDoList').on('mouseout', 'li', function(){
				var $removeButton = $(this).find('a');
				$removeButton.css('display', 'none');
			});
			$('#toDoList').on('click', '.removeListItem', function(e) {
				e.preventDefault();
				$(this).parent().remove();
				localStorage.setItem('todoListPlus', theList.innerHTML);
			});
			$('#doClearAll').on('click', '#clearAll', function(e) {
				e.preventDefault();
				$('#toDoList').children().remove();
				newList = true;
				$('#toDoItem').val('');
				$('#doClearAll').css('display', 'none');
				$('#toDoItem').focus();
				localStorage.setItem('todoListPlus', theList.innerHTML);
			});
			loadMyList();


			function loadMyList(){
				if(localStorage.getItem('todoListPlus')) {
					theList.innerHTML = localStorage.getItem('todoListPlus');
					$('.sortable').sortable('destroy');
					$('.sortable').sortable({
						handle: '.handle'
					});
					var theCount = $("#toDoList li").length + 1;
						if (theCount > 1) {
							$('#doClearAll').css('display','block');
						}
				}
			}
				
		});