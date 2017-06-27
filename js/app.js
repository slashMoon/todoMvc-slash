(function (angular) {
	'use strict';

	angular
		.module('todoApp', [])
		.controller('TodoController', ['$scope', '$location', TodoController]);


	//控制器函数
	function TodoController($scope, $location) {
		var vm = $scope;

		//
		var todoList = [
			{ id: 1, name: "抽烟", isCompleted: false },
			{ id: 2, name: "烫头", isCompleted: false },
			{ id: 3, name: "喝酒", isCompleted: true }
		]


		vm.addname = "";
		// 添加情况
		$scope.add = function () {
			// 判断空字符串的情况
			if (vm.addname.trim() === "") {
				return
			}

			//处理id 值
			//判断数组为空的时候
			var id;
			if (todoList.length === 0) {
				id = 1
			} else {

				id = todoList[todoList.length - 1].id + 1;
			}
			todoList.push(
				{ id: id, name: vm.addname, isCompleted: false }
			)
			// 清空文本框（清空 taskname 属性的值）
			vm.addname = '';
		}

		//删除情况
		$scope.remove = function (id) {

			for (var i = 0; i < todoList.length; i++) {
				if (todoList[i].id === id) {
					todoList.splice(i, 1);
					break;
				}
			}
		}

		// 修改任务
		vm.editingId = -1;
		$scope.edit = function (id) {
			vm.editingId = id;
		}

		//更新数据
		$scope.update = function () {
			vm.editingId = -1;
		};

		//全选功能
		vm.isCheckAll = false;
		vm.checkAll = function () {
			todoList.forEach(function (todo) {
				todo.isCompleted = vm.isCheckAll;
			});

		};

		//清除已完成任务
		vm.clearCompleted = function () {
			// 将未完成的加到新的数组当中
			var tempArr = [];
			for (var i = 0; i < todoList.length; i++) {
				var todo = todoList[i];
				if (!todo.isCompleted) {
					tempArr.push(todo);
				}
			}

			vm.todoList.length = 0;
			[].push.apply(vm.todoList, tempArr);
		};

		//显示隐藏清除完成按钮
		vm.isShow = function () {

			return todoList.some(function (todo, index) {

				if (todo.isCompleted) {
					return true
				}
			})
		}

		// 显示未完成的任务
		vm.getItem = function(){
			var count = 0;
			todoList.forEach(function(todo){
				if(!todo.isCompleted){
					count++;
				}

			})
			return count;
		}

		//显示不同状态的任务
		// 以及当前任务高亮处理
		//通过angular中的过滤器
		// 展示已完成的任务：true;
		//展示未完成的任务： false
		// 展示所有的设置为udefined
		vm.status = undefined;
		// vm.showAll = function () {
		// 	vm.status = undefined;
		// }
		// vm.showActive = function () {
		// 	vm.status = false;
		// };
		// vm.showCompleted = function () {
		// 	vm.status = true;
		// }

		//9 n根据url变化显示相应的任务
		// 思路：监视url中hash值的变化
		// $scope.$watch()

		//通过 $location.url()来获取地址栏
		// 

		vm.location = $location
		console.log($location.url())


		vm.$watch("location.url()", function (curvalue) {
			switch (curvalue) {
				case "/#%2Fcompleted":
					vm.status = true;
					break
				case "/#%2Factive":
					vm.status = false;
					break;
					default:
					vm.status = undefined;
					break;
			}

		})







		//暴露到vm中
		vm.todoList = todoList;

	}
})(angular);

// 
