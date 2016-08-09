/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function () {
    'use strict';

    angular.module('ngTable')
        .controller('ngTableFilterRowController', ngTableFilterRowController);

    ngTableFilterRowController.$inject = ['$scope', 'ngTableFilterConfig'];

    function ngTableFilterRowController($scope, ngTableFilterConfig) {

        $scope.config = ngTableFilterConfig;

        $scope.getFilterCellCss = function (filter, layout) {
            if (layout !== 'horizontal') {
                return 's12';
            }

            var size = Object.keys(filter).length;
            var width = parseInt(12 / size, 10);
            return 's' + width;
        };

        $scope.getColspan = function (columns, column) {
            var colspan = 0;
            angular.forEach(columns, function (col) {
                if (col.show() && !col.locked() && col.active()) {
                    if (column.headerGroup() || 0 !== column.headerGroup().length) {
                        if (column.headerGroup() == col.headerGroup()) {
                            colspan++;
                        }
                    }
                }
            });
            return colspan;
        };

        $scope.getGroupedColumns = function (columns) {
            if (!angular.isArray(columns)) {
                return columns;
            }

            var groupedColumns = [];

            angular.forEach(columns, function (column) {
                if (column.show() && !column.locked() && column.active()) {
                    if (!containsGroup(column, groupedColumns)) {
                        groupedColumns.push(column);
                    }
                }
            });

            function containsGroup(column, columns) {
                var i;
                for (i = 0; i < columns.length; i++) {
                    if (column.headerGroup() || 0 !== column.headerGroup().length) {
                        if (columns[i].headerGroup() === column.headerGroup()) {
                            return true;
                        }
                    }
                }
                return false;
            };

            return groupedColumns;
        };

        $scope.getFilterPlaceholderValue = function (filterValue/*, filterName*/) {
            if (angular.isObject(filterValue)) {
                return filterValue.placeholder;
            } else {
                return '';
            }
        };
    }
})();
