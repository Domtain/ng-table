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
        .controller('ngTableSorterRowController', ngTableSorterRowController);

    ngTableSorterRowController.$inject = ['$scope'];

    function ngTableSorterRowController($scope) {

        $scope.sortBy = sortBy;

        ///////////

        function sortBy($column, event) {
            var parsedSortable = $column.sortable && $column.sortable();
            if (!parsedSortable) {
                return;
            }
            var settings = $scope.params.settings();
            var defaultSort = $scope.params.settings().defaultSort;
            var inverseSort = (defaultSort === 'asc' ? 'desc' : 'asc');
            var multipleSort = (event.ctrlKey || event.metaKey);
            var sorting = $scope.params.sorting(), newSort = defaultSort;
            if (sorting && sorting[parsedSortable]) {
                if (settings.allowUnsort) {
                    if (sorting[parsedSortable] === defaultSort) {
                        newSort = inverseSort;
                    } else if (sorting[parsedSortable] === inverseSort) {
                        newSort = false;
                    } else {
                        newSort = defaultSort;
                    }
                } else {
                    newSort = sorting[parsedSortable] === defaultSort ? inverseSort : defaultSort;
                }
            }

            var sortingParams = multipleSort ? $scope.params.sorting() : {};

            if (newSort) {
                sortingParams[parsedSortable] = newSort;
            } else {
                delete sortingParams[parsedSortable];
            }
            $scope.params.parameters({
                sorting: sortingParams
            });
        }
    }
})();
