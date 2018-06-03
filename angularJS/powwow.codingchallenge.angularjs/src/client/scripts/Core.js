// Core.js
// Date: Wed, Dec 21 of 2016 - Sebastopol, California 96472
// Created By: Sergio Carrero
// Email: ingscarrero@icloud.com 
// Description: Object that abstracts the core functionality in response to the quiz
// emailed by PowWowMobile.
var Core = function (){
	if (!String.prototype.format) {
	  String.prototype.format = function() {
	    var args = arguments;
	    return this.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	  };
	}
	this.question = 0;
	this.dataSource = "../server/data/menu.json";
};

Core.prototype = {
	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/28/2016
	/// Description: Handle jsonp resource consumption to retrieve partial view that represent the contents of a given item.
	/// Parameters: jsonp content
	injectItem: function(data){
		$(data.target).html(data.html);
	},
	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/28/2016
	/// Description: Handle jsonp resource consumption to retrieve menu configuration.
	/// Parameters: jsonp content
	loadMenu: function (data){
		var menuContainer = $('#pw_menu');
		var htmlString = "";
		$.each(data.menu.items, function(i, v){
			htmlString += "<div class=\"row well well-lg\"><div class=\"col-sm-4\"><img src=\"{2}\" alt=\"{3}\" class=\"img-responsive\"></div><div class=\"col-sm-8\"><h2>{0}</h2><p>{1}</p></div><div class=\"col-md-12\" id=\"question-{4}\"></div></div>".format(v.caption, v.description, v.image.url, v.image.alt, v.index);
		});
		menuContainer.html(htmlString);

		var fileUploadHtml = "";

		$.ajax({
			dataType: "jsonp", // jsonp
  			url: "partials/q1-file-input.json",
  			crossDomain: true,
  			jsonpCallback: 'injectItem',
  			success:function(data){
				injectItem(data);
			}
		});
		$.ajax({
			dataType: "jsonp", // jsonp
  			url: "partials/q2-file-input.json",
  			crossDomain: true,
  			jsonpCallback: 'injectItem',
  			success:function(data){
				injectItem(data);
			}
		});
		$.ajax({
			dataType: "jsonp", // jsonp
  			url: "partials/q3-file-input.json",
  			crossDomain: true,
  			jsonpCallback: 'injectItem',
  			success:function(data){
				injectItem(data);
			}
		});
		$.ajax({
			dataType: "jsonp", // jsonp
  			url: "partials/q4-centered-square-container.json",
  			crossDomain: true,
  			jsonpCallback: 'injectItem',
  			success:function(data){
				injectItem(data);
			}
		});

		// Sergio Carrero - 12/28/2016
		// Implementation unsupported because of cross domain restrictions
		// =>
		/*
		$.get("partials/q1-file-input.html").done(function(data){
				$("#question-0").html(data);
			}).fail(function(data, error){
				core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
				return;
		});
		$.get("partials/q2-file-input.html").done(function(data){
				$("#question-1").html(data);
			}).fail(function(data, error){
				core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
				return;
		});
		$.get("partials/q3-file-input.html").done(function(data){
				$("#question-2").html(data);
			}).fail(function(data, error){
				core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
				return;
		});
		$.get("partials/q4-centered-square-container.html").done(function(data){
				$("#question-3").html(data);
			}).fail(function(data, error){
				core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
				return;
		});*/
		//<=
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Initializes the GUI by loading the menu components.
	/// Parameters: 
	getMenu: function(){
		// Sergio Carrero - 12/28/2016
		// Implementation unsupported because of cross domain restrictions
		// =>
		/*
		$.getJSON(core.dataSource).done(function(data){
			var menuContainer = $('#pw_menu');
			var htmlString = "";
			$.each(data.menu.items, function(i, v){
				htmlString += "<div class=\"row well well-lg\"><div class=\"col-sm-4\"><img src=\"{2}\" alt=\"{3}\" class=\"img-responsive\"></div><div class=\"col-sm-8\"><h2>{0}</h2><p>{1}</p></div><div class=\"col-md-12\" id=\"question-{4}\"></div></div>".format(v.caption, v.description, v.image.url, v.image.alt, v.index);
			});
			menuContainer.html(htmlString);

			var fileUploadHtml = "";
			$.get("partials/q1-file-input.html").done(function(data){
					$("#question-0").html(data);
				}).fail(function(data, error){
					core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
					return;
			});
			$.get("partials/q2-file-input.html").done(function(data){
					$("#question-1").html(data);
				}).fail(function(data, error){
					core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
					return;
			});
			$.get("partials/q3-file-input.html").done(function(data){
					$("#question-2").html(data);
				}).fail(function(data, error){
					core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
					return;
			});
			$.get("partials/q4-centered-square-container.html").done(function(data){
					$("#question-3").html(data);
				}).fail(function(data, error){
					core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
					return;
			});
			
		}).fail(function(data, error){
			core.modal("Application Error", "There were problems loading the information of the web application. {0}".format(error));
			return;
		});*/
		// <=
		$.ajax({
			dataType: "jsonp", // jsonp
  			url: core.dataSource,
  			crossDomain: true,
  			success:function(data){
				loadMenu(data);
			}
		});

		
	},

	// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Set the question index to define the file processing algorithm.
	/// Parameters: 
	/// - index: question intex
	setQuestion: function(index){
		this.question = parseInt(index);
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Register the delegate object for processing the file information.
	/// Parameters: 
	/// - fileInput: html control of type file input. 
	readFile: function(fileInput){

		if(!window.FileReader){
			alert("Ups! Your browser doesn't support the file reading functionality. Try another one.");
		}

		var reader = new FileReader();

		if(fileInput.files.length){
			var textFile = fileInput.files[0];
			reader.readAsText(textFile);
			$(reader).on('load', this.handleFileReadCompleted);

		} else {
			alert("Ups! There is no file to be readed. Please upload a text file, and try again.");
		}
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Function that handles the file input notification corresponding to a file upload.
	/// Parameters: 
	/// - e: Handled event.
	handleFileReadCompleted: function(e){
		var data = e.target.result;
		var option = core.question;
		if (data) {
			switch(option)
			{
				case 1:
					core.sortByExpiration(data);
					break;
				case 2:
					core.buildTree(data);
					break;
				case 3:
					var filter = $("#find_input").val();
					core.findInTree(data, filter);
					break;
				default:
					core.getMenu();
					break;
			}
		}
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Display a modal control according to the provided title and message.
	/// Parameters: 
	/// - title: HTML string that represents the modal's title to display.
	/// - message: HTML string that represents the modal's message to display.
	modal:  function (title, message) {
		var modal = $('#pw_modal');
		
		$('#pw_modal_title').html(title);
		$('#pw_modal_content').html(message);
		
		modal.css("display","block");

		var close = $('.pw-close')[0];
		$(document).on('click', '.pw-close', function(){
			modal.css("display","none");
		});
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Extract the elements of an array in a JSON string, process the elements to generate an information structure, and generate a HTML string that 
	/// renders the result of the process.
	/// Parameters: 
	/// - data: JSON string that represents the information to process.
	buildTree: function(data){

		var result = "No elements";
		var elements = null;

		try{
			elements = $.parseJSON(data);
		}
		catch(err){
			core.modal("Error", "Ups! It seems that the file that you have submitted has the wrong format. Please check it out and try again.");
			return;
		}

		var tree = {};
		if (elements) {
			$.each(elements, function(i, v){
				tree = core.addBranch(tree, v);
			});
		}

		var items = Object.keys(tree);

		if (items.length > 0) {

			result = "<p>{0}</p><ul><li><span>{1}</span><ul>{2}</ul></li></ul>".format(
					"According with the submitted file, the tree structure for the provided records is as follows:", 
					"root", 
					core.printBranch(tree)
				);
		}

		core.modal("Transaction successfull", result);
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Build up a tree structure for a given string that stores information of a tree element.
	/// Parameters: 
	/// - root: Object that represent an information structure
	/// - inputString: string that stores information of a tree element.
	/// Outputs:
	/// - Generated information structure.
	addBranch(root, inputString){
		var path = inputString.split(".")[0];
		var index = inputString.indexOf(".")+1;
		var subPath = inputString.substring(index);
		
		
		if (index==0) {
			root[path] = null;
			return root;
		}

		if(root[path]){
			root[path] = core.addBranch(root[path], subPath);
		}
		else{
			root[path] = {};
			root[path] = core.addBranch(root[path], subPath);
		}

		return root;
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Take and objects that represents an information structure and recoursively print its information and its children's information. 
	/// Return a HTML string that represents the processed information.
	/// Parameters: 
	/// - branch: Object that represent an information structure
	/// Outputs:
	/// - HTML string representing the result of the activity.
	printBranch(branch){
		var output = "";
		var items = branch != undefined ? Object.keys(branch) : null;

		if(items && items.length > 0){
			$.each(items, function(i, b){
				
				var children = "";
				if (branch[items[i]] != null) {
					children += core.printBranch(branch[items[i]]);	
				}

				output += "<li><span>{0}<span><ul>{1}</ul></li>".format(
						items[i], 
						children
					);

			});
			return output;
		} else {
			return output;
		}
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Take and objects that represents an information structure and recoursively find the input text in the given object and its children. 
	/// Return a HTML string that represents the processed information.
	/// Parameters: 
	/// - data:  JSON string that represents the information to process.
	/// - input: Text to find.
	findInTree(data, input){
		var elements = null;

		try{
			elements = $.parseJSON(data);
		}
		catch(err){
			core.modal("Error", "Ups! It seems that the file that you have submitted has the wrong format. Please check it out and try again.");
			return;
		}

		var tree = {};
		if (elements) {
			$.each(elements, function(i, v){
				tree = core.addBranch(tree, v);
			});
		}

		var items = Object.keys(tree);

		if (items.length > 0) {
			var result = core.findInBranch(tree, "", input);
			var itemsFound = "";
			if (result && result.length > 0) {
				$.each(result, function(i, v){
					itemsFound += "<li>{0}</li>".format(v);
				});

			} else {
				itemsFound = "No items found.";
			}

			var output = "<p>{0}</p><ul>{1}</ul>".format(
					"According with the submitted file, the tree items that satisfy the search criteria are listed as follows:", 
					itemsFound
				);
			core.modal("Transaction successfull", output);
		} else {
			var output = "<p>{0}</p>".format(
					"According with the submitted file, there were no items retrieved."
				);
			core.modal("Transaction successfull", output);
		}
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Take an objects that represents an information structure and recoursively find the input text in the given object and its children. 
	/// Return an string array which contains the matches path.
	/// Parameters: 
	/// - branch: Object that represent an information structure
	/// - currentPath: String that keeps track of the path from the root to the leaves of the information structure.   
	/// - input: Text to find.
	/// Outputs:
	/// - String array with the matches path.
	findInBranch(branch, currentPath, input){
		var result = [];
		var items = branch != undefined ? Object.keys(branch) : null;
		if(items && items.length > 0){
			var match = $.grep(items, function(v, i){
				return v == input;
			});
			if (match && match.length > 0) {
				var temp = core.getChildren(branch[match]);
				if (temp && temp.length > 0) {
					$.each(temp, function(i, v){
						result.push("{0}{1}.{2}".format(currentPath, match, v));
					});
				} 
				else
				{
					result.push("{0}{1}".format(currentPath, match));
				}
				
			} else {
				$.each(items, function(i, v){
					var temp = core.findInBranch(branch[v], "{0}{1}.".format(currentPath, v), input);
					if (temp && temp.length > 0) {
						$.each(temp, function(j, sv){
							result.push(sv);
						});
					} 
				})

			}

			return result;
		}
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Search recoursively the children of an object that represent an information structure. Return an string array which contains the matches path.
	/// Parameters: 
	/// - branch: Object that represent an information structure
	/// Outputs:
	/// - String array with the matches path.
	getChildren(branch){
		var items = branch != undefined ? Object.keys(branch) : null;
		var result = [];
		if(items && items.length > 0){
			$.each(items, function(i, v){
				var children = core.getChildren(branch[v]);
				if (children && children.length > 0) {
					$.each(children, function(j, sv){
						result.push("{0}.{1}".format(v, sv));
					});
				}
				else{
					result.push(v);
				}
			});
		}
		return result;
	},

	/// Author: Sergio Carrero
	/// Email: ingscarrero@icloud.com
	/// Created: 12/23/2016
	/// Description: Extract the elements of an array in a JSON string, sort them by expiration status and generate a HTML string that 
	/// renders the results in a List of elements.
	/// Parameters: 
	/// - data: JSON string that represents the information to process.
	sortByExpiration: function(data){
		var result = "No elements";
		var elements = null;

		try{
			elements = $.parseJSON(data);
		}
		catch(err){
			core.modal("Error", "Ups! It seems that the file that you have submitted has the wrong format. Please check it out and try again.");
			return;
		}

		if (elements) {
			var sortedElements = elements.sort(function(a,b){
				return a.isExpired ? 1 : -1;
			});

			var output = "<p>{0}</p><ul>".format("According with the submitted file, the sorting of the provided records by expiration status is as follows:");
			$.each(sortedElements, function(e, v){
				output += "<li> <b>Name:</b> {0} <b>Expired:</b> {1} </li>".format(v.name, v.isExpired);
			});
			output += "</ul>";

			result = output;
		}

		core.modal("Transaction successfull", result);
	}

};