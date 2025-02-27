import React, { useRef, useReducer, useLayoutEffect, useEffect, useState } from 'react';
import { instanceOf, number, object, objectOf, bool, string, func, oneOf, node } from 'prop-types';
import { getDate, isToday, format, isSameMonth, getYear, startOfMonth, subMonths, addMonths, startOfWeek, endOfWeek, addWeeks, endOfMonth, differenceInCalendarWeeks, differenceInCalendarMonths, isAfter, isBefore, eachDayOfInterval, lightFormat, startOfDay, differenceInDays, set, isSameDay, isValid, parse } from 'date-fns';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var defaultModifiersClassNames = {
  today: '-today',
  outside: '-outside',
  wide: '-wide',
  disabled: '-disabled',
  selected: '-selected',
  selectedStart: '-selected-start',
  selectedMiddle: '-selected-middle',
  selectedEnd: '-selected-end'
};
function CalendarDay(_ref) {
  var date = _ref.date,
      height = _ref.height,
      locale = _ref.locale,
      receivedModifiers = _ref.modifiers,
      receivedModifiersClassNames = _ref.modifiersClassNames,
      onClick = _ref.onClick,
      onHover = _ref.onHover;
  var dayOfMonth = getDate(date);
  var dayClassNames = {};

  var modifiers = _objectSpread2({
    today: isToday(date)
  }, receivedModifiers);

  var modifiersClassNames = _objectSpread2(_objectSpread2({}, defaultModifiersClassNames), receivedModifiersClassNames);

  Object.keys(modifiers).forEach(function (name) {
    dayClassNames[modifiersClassNames[name]] = modifiers[name];
  });

  var handleClick = function handleClick(event) {
    onClick(date);
    event.preventDefault();
  };

  var handleMouseEnter = function handleMouseEnter() {
    onHover(date);
  };

  var handleMouseLeave = function handleMouseLeave() {
    onHover(null);
  };

  return /*#__PURE__*/React.createElement("span", {
    className: classnames('nice-dates-day', dayClassNames),
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchEnd: handleClick,
    style: {
      height: height
    }
  }, dayOfMonth === 1 && /*#__PURE__*/React.createElement("span", {
    className: "nice-dates-day_month"
  }, format(date, 'LLL', {
    locale: locale
  })), /*#__PURE__*/React.createElement("span", {
    className: "nice-dates-day_date"
  }, dayOfMonth));
}
CalendarDay.propTypes = {
  date: instanceOf(Date).isRequired,
  height: number.isRequired,
  locale: object.isRequired,
  modifiers: objectOf(bool),
  modifiersClassNames: objectOf(string),
  onHover: func,
  onClick: func
};
CalendarDay.defaultProps = {
  modifiers: {},
  onHover: function onHover() {},
  onClick: function onClick() {}
};

function CalendarNavigation(_ref) {
  var locale = _ref.locale,
      month = _ref.month,
      minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate,
      onMonthChange = _ref.onMonthChange;

  var handlePrevious = function handlePrevious(event) {
    onMonthChange(startOfMonth(subMonths(month, 1)));
    event.preventDefault();
  };

  var handleNext = function handleNext(event) {
    onMonthChange(startOfMonth(addMonths(month, 1)));
    event.preventDefault();
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates-navigation"
  }, /*#__PURE__*/React.createElement("a", {
    className: classnames('nice-dates-navigation_previous', {
      '-disabled': isSameMonth(month, minimumDate)
    }),
    onClick: handlePrevious,
    onTouchEnd: handlePrevious
  }), /*#__PURE__*/React.createElement("span", {
    className: "nice-dates-navigation_current"
  }, format(month, getYear(month) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy', {
    locale: locale
  })), /*#__PURE__*/React.createElement("a", {
    className: classnames('nice-dates-navigation_next', {
      '-disabled': isSameMonth(month, maximumDate)
    }),
    onClick: handleNext,
    onTouchEnd: handleNext
  }));
}
CalendarNavigation.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onMonthChange: func.isRequired
};

var START_DATE = 'startDate';
var END_DATE = 'endDate';
var ORIGIN_BOTTOM = 'bottom';
var ORIGIN_TOP = 'top';

var rowsBetweenDates = function rowsBetweenDates(startDate, endDate, locale) {
  return differenceInCalendarWeeks(endDate, startDate, {
    locale: locale
  }) + 1;
};

var rowsInMonth = function rowsInMonth(date, locale) {
  return rowsBetweenDates(startOfMonth(date), endOfMonth(date), locale);
};

var getStartDate = function getStartDate(date, locale) {
  return startOfWeek(startOfMonth(date), {
    locale: locale
  });
};

var getEndDate = function getEndDate(date, locale) {
  return endOfWeek(addWeeks(endOfMonth(date), 6 - rowsInMonth(date, locale)), {
    locale: locale
  });
};

var createInitialState = function createInitialState(currentMonth, locale) {
  return {
    startDate: getStartDate(currentMonth, locale),
    endDate: getEndDate(currentMonth, locale),
    cellHeight: 0,
    isWide: false,
    lastCurrentMonth: currentMonth,
    locale: locale,
    offset: 0,
    origin: ORIGIN_TOP,
    transition: false
  };
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'setStartDate':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        startDate: action.value
      });

    case 'setEndDate':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        endDate: action.value
      });

    case 'setRange':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        startDate: action.startDate,
        endDate: action.endDate
      });

    case 'setCellHeight':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        cellHeight: action.value
      });

    case 'setIsWide':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isWide: action.value
      });

    case 'reset':
      return _objectSpread2(_objectSpread2({}, createInitialState(action.currentMonth, state.locale)), {}, {
        cellHeight: state.cellHeight,
        isWide: state.isWide
      });

    case 'transitionToCurrentMonth':
      {
        var currentMonth = action.currentMonth;
        var lastCurrentMonth = state.lastCurrentMonth,
            startDate = state.startDate,
            endDate = state.endDate,
            cellHeight = state.cellHeight;

        var newState = _objectSpread2(_objectSpread2({}, state), {}, {
          lastCurrentMonth: currentMonth,
          transition: true
        });

        if (isAfter(currentMonth, lastCurrentMonth)) {
          var offset = -(rowsBetweenDates(startDate, currentMonth, state.locale) - 1) * cellHeight;
          return _objectSpread2(_objectSpread2({}, newState), {}, {
            endDate: getEndDate(currentMonth, state.locale),
            offset: offset,
            origin: ORIGIN_TOP
          });
        } else if (isBefore(currentMonth, lastCurrentMonth)) {
          var gridHeight = cellHeight * 6;

          var _offset = rowsBetweenDates(currentMonth, endDate, state.locale) * cellHeight - gridHeight;

          return _objectSpread2(_objectSpread2({}, newState), {}, {
            startDate: getStartDate(currentMonth, state.locale),
            offset: _offset,
            origin: ORIGIN_BOTTOM
          });
        }

        return state;
      }

    default:
      throw new Error("Unknown ".concat(action.type, " action type"));
  }
};

function useGrid(_ref) {
  var locale = _ref.locale,
      currentMonth = _ref.month,
      onMonthChange = _ref.onMonthChange,
      transitionDuration = _ref.transitionDuration,
      touchDragEnabled = _ref.touchDragEnabled;
  var timeoutRef = useRef();
  var containerElementRef = useRef();
  var initialDragPositionRef = useRef(0);

  var _useReducer = useReducer(reducer, createInitialState(currentMonth, locale)),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var startDate = state.startDate,
      endDate = state.endDate,
      cellHeight = state.cellHeight,
      lastCurrentMonth = state.lastCurrentMonth,
      offset = state.offset,
      origin = state.origin,
      transition = state.transition,
      isWide = state.isWide;
  useLayoutEffect(function () {
    var notDragging = !initialDragPositionRef.current;

    if (!isSameMonth(lastCurrentMonth, currentMonth) && notDragging) {
      var containerElement = containerElementRef.current;
      containerElement.classList.add('-transition');
      clearTimeout(timeoutRef.current);

      if (Math.abs(differenceInCalendarMonths(currentMonth, lastCurrentMonth)) <= 3) {
        dispatch({
          type: 'transitionToCurrentMonth',
          currentMonth: currentMonth
        });
        timeoutRef.current = setTimeout(function () {
          dispatch({
            type: 'reset',
            currentMonth: currentMonth
          });
        }, transitionDuration);
      } else {
        dispatch({
          type: 'reset',
          currentMonth: currentMonth
        });
      }
    }
  }, [currentMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(function () {
    if (!touchDragEnabled) {
      return;
    }

    var containerElement = containerElementRef.current;
    var gridHeight = cellHeight * 6;
    var halfGridHeight = gridHeight / 2;

    if (containerElement) {
      var handleDragStart = function handleDragStart(event) {
        clearTimeout(timeoutRef.current);
        var computedOffset = Number(window.getComputedStyle(containerElement).transform.match(/([-+]?[\d.]+)/g)[5]);
        var currentMonthPosition = 0;

        if (!initialDragPositionRef.current) {
          var newStartDate = getStartDate(subMonths(currentMonth, 1), locale);
          currentMonthPosition = (rowsBetweenDates(newStartDate, currentMonth, locale) - 1) * cellHeight;
          dispatch({
            type: 'setRange',
            startDate: newStartDate,
            endDate: getEndDate(addMonths(currentMonth, 1), locale)
          });
        }

        containerElement.style.transform = "translate3d(0, ".concat(computedOffset || -currentMonthPosition, "px, 0)");
        containerElement.classList.remove('-transition');
        containerElement.classList.add('-moving');
        initialDragPositionRef.current = event.touches[0].clientY + (-computedOffset || currentMonthPosition);
      };

      var handleDrag = function handleDrag(event) {
        var initialDragPosition = initialDragPositionRef.current;
        var dragOffset = event.touches[0].clientY - initialDragPosition;
        var previousMonth = subMonths(currentMonth, 1);
        var previousMonthPosition = (rowsBetweenDates(startDate, previousMonth, locale) - 1) * cellHeight;
        var currentMonthPosition = (rowsBetweenDates(startDate, currentMonth, locale) - 1) * cellHeight;
        var nextMonth = addMonths(currentMonth, 1);
        var nextMonthPosition = (rowsBetweenDates(startDate, nextMonth, locale) - 1) * cellHeight;

        if (dragOffset < 0) {
          if (Math.abs(dragOffset) > currentMonthPosition && isBefore(endDate, addMonths(currentMonth, 2))) {
            dispatch({
              type: 'setEndDate',
              value: getEndDate(nextMonth, locale)
            });
          }
        } else if (dragOffset > 0) {
          var newStartDate = getStartDate(previousMonth, locale);
          var newCurrentMonthPosition = (rowsBetweenDates(newStartDate, currentMonth, locale) - 1) * cellHeight;
          initialDragPositionRef.current += newCurrentMonthPosition;
          dispatch({
            type: 'setStartDate',
            value: newStartDate
          });
        }

        var shouldChangeToNextMonth = Math.abs(dragOffset) > nextMonthPosition - halfGridHeight;
        var shouldChangeToPreviousMonth = Math.abs(dragOffset) > previousMonthPosition - halfGridHeight && Math.abs(dragOffset) < currentMonthPosition - halfGridHeight;

        if (shouldChangeToNextMonth) {
          onMonthChange(nextMonth);
        } else if (shouldChangeToPreviousMonth) {
          onMonthChange(previousMonth);
        }

        containerElement.style.transform = "translate3d(0, ".concat(dragOffset, "px, 0)");
        event.preventDefault();
      };

      var handleDragEnd = function handleDragEnd(event) {
        var currentMonthPosition = (rowsBetweenDates(startDate, currentMonth, locale) - 1) * cellHeight;
        containerElement.style.transform = "translate3d(0, ".concat(-currentMonthPosition, "px, 0)");
        containerElement.classList.add('-transition');
        containerElement.classList.remove('-moving');
        timeoutRef.current = setTimeout(function () {
          initialDragPositionRef.current = 0;
          containerElement.style.transform = 'translate3d(0, 0, 0)';
          containerElement.classList.remove('-transition');
          dispatch({
            type: 'reset',
            currentMonth: currentMonth
          });
        }, transitionDuration);

        if (Math.abs(initialDragPositionRef.current - currentMonthPosition - event.changedTouches[0].clientY) > 10) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      containerElement.addEventListener('touchstart', handleDragStart);
      containerElement.addEventListener('touchmove', handleDrag);
      containerElement.addEventListener('touchend', handleDragEnd);
      return function () {
        containerElement.removeEventListener('touchstart', handleDragStart);
        containerElement.removeEventListener('touchmove', handleDrag);
        containerElement.removeEventListener('touchend', handleDragEnd);
      };
    }
  });
  useEffect(function () {
    var handleResize = function handleResize() {
      var containerElement = containerElementRef.current;
      var containerWidth = containerElement.offsetWidth;
      var cellWidth = containerWidth / 7;
      var newCellHeight = 1;
      var wide = false;

      if (cellWidth > 60) {
        newCellHeight += Math.round(cellWidth * 0.75);
        wide = true;
      } else {
        newCellHeight += Math.round(cellWidth);
      }

      dispatch({
        type: 'setIsWide',
        value: wide
      });
      dispatch({
        type: 'setCellHeight',
        value: newCellHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return {
    startDate: startDate,
    endDate: endDate,
    cellHeight: cellHeight,
    containerElementRef: containerElementRef,
    offset: offset,
    origin: origin,
    transition: transition,
    isWide: isWide
  };
}

var computeModifiers = function computeModifiers(modifiers, date) {
  var computedModifiers = {};
  Object.keys(modifiers).map(function (key) {
    computedModifiers[key] = modifiers[key](date);
  });
  return computedModifiers;
};

function CalendarGrid(_ref) {
  var locale = _ref.locale,
      month = _ref.month,
      modifiers = _ref.modifiers,
      modifiersClassNames = _ref.modifiersClassNames,
      onMonthChange = _ref.onMonthChange,
      onDayHover = _ref.onDayHover,
      onDayClick = _ref.onDayClick,
      transitionDuration = _ref.transitionDuration,
      touchDragEnabled = _ref.touchDragEnabled;
  var grid = useGrid({
    locale: locale,
    month: startOfMonth(month),
    onMonthChange: onMonthChange,
    transitionDuration: transitionDuration,
    touchDragEnabled: touchDragEnabled
  });
  var startDate = grid.startDate,
      endDate = grid.endDate,
      cellHeight = grid.cellHeight,
      containerElementRef = grid.containerElementRef,
      isWide = grid.isWide,
      offset = grid.offset,
      origin = grid.origin,
      transition = grid.transition;
  var days = eachDayOfInterval({
    start: startDate,
    end: endDate
  }).map(function (date) {
    return /*#__PURE__*/React.createElement(CalendarDay, {
      date: date,
      height: cellHeight,
      key: lightFormat(date, 'yyyy-MM-dd'),
      locale: locale,
      modifiers: _objectSpread2(_objectSpread2({}, computeModifiers(modifiers, date)), {}, {
        outside: !isSameMonth(date, month),
        wide: isWide
      }),
      modifiersClassNames: modifiersClassNames,
      onHover: onDayHover,
      onClick: onDayClick
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates-grid",
    style: {
      height: cellHeight * 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('nice-dates-grid_container', {
      '-moving': offset,
      '-origin-bottom': origin === ORIGIN_BOTTOM,
      '-origin-top': origin === ORIGIN_TOP,
      '-transition': transition
    }),
    ref: containerElementRef,
    style: {
      transform: "translate3d(0, ".concat(offset, "px, 0)"),
      transitionDuration: "".concat(transitionDuration, "ms")
    }
  }, days));
}
CalendarGrid.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  onMonthChange: func.isRequired,
  onDayHover: func,
  onDayClick: func,
  transitionDuration: number.isRequired,
  touchDragEnabled: bool
};
CalendarGrid.defaultProps = {
  modifiers: {},
  transitionDuration: 500,
  touchDragEnabled: true
};

function CalendarWeekHeader(_ref) {
  var locale = _ref.locale,
      weekdayFormat = _ref.weekdayFormat;
  var today = new Date();
  var weekDays = eachDayOfInterval({
    start: startOfWeek(today, {
      locale: locale
    }),
    end: endOfWeek(today, {
      locale: locale
    })
  }).map(function (date) {
    return format(date, weekdayFormat, {
      locale: locale
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates-week-header"
  }, weekDays.map(function (day) {
    return /*#__PURE__*/React.createElement("span", {
      key: day,
      className: "nice-dates-week-header_day"
    }, day);
  }));
}
CalendarWeekHeader.propTypes = {
  locale: object.isRequired,
  weekdayFormat: string
};
CalendarWeekHeader.defaultProps = {
  weekdayFormat: 'eee'
};

var isSelectable = function isSelectable(date, _ref) {
  var minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate;
  return !isBefore(date, startOfDay(minimumDate)) && !isAfter(date, maximumDate);
};
var mergeModifiers = function mergeModifiers(baseModifiers, newModifiers) {
  var modifiers = _objectSpread2({}, baseModifiers);

  if (!newModifiers) {
    return baseModifiers;
  }

  Object.keys(newModifiers).forEach(function (name) {
    modifiers[name] = baseModifiers[name] ? function (date) {
      return baseModifiers[name](date) || newModifiers[name](date);
    } : newModifiers[name];
  });
  return modifiers;
};
var setTime = function setTime(date, dateWithTime) {
  return set(date, {
    hours: dateWithTime.getHours(),
    minutes: dateWithTime.getMinutes(),
    seconds: dateWithTime.getSeconds()
  });
};
var isRangeLengthValid = function isRangeLengthValid(_ref2, _ref3) {
  var startDate = _ref2.startDate,
      endDate = _ref2.endDate;
  var minimumLength = _ref3.minimumLength,
      maximumLength = _ref3.maximumLength;
  return differenceInDays(startOfDay(endDate), startOfDay(startDate)) >= minimumLength && (!maximumLength || differenceInDays(startOfDay(endDate), startOfDay(startDate)) <= maximumLength);
};

function useControllableState(value, onChange, intitialValue) {
  var _useState = useState(intitialValue),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  return onChange ? [value, onChange] : [state, setState];
}

function Calendar(_ref) {
  var locale = _ref.locale,
      receivedMonth = _ref.month,
      receivedModifiers = _ref.modifiers,
      modifiersClassNames = _ref.modifiersClassNames,
      minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate,
      onMonthChange = _ref.onMonthChange,
      onDayHover = _ref.onDayHover,
      onDayClick = _ref.onDayClick,
      weekdayFormat = _ref.weekdayFormat,
      touchDragEnabled = _ref.touchDragEnabled;

  var _useControllableState = useControllableState(receivedMonth, onMonthChange, startOfMonth(new Date())),
      _useControllableState2 = _slicedToArray(_useControllableState, 2),
      month = _useControllableState2[0],
      setMonth = _useControllableState2[1];

  var modifiers = mergeModifiers({
    disabled: function disabled(date) {
      return !isSelectable(date, {
        minimumDate: minimumDate,
        maximumDate: maximumDate
      });
    }
  }, receivedModifiers);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CalendarNavigation, {
    locale: locale,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    month: month,
    onMonthChange: setMonth
  }), /*#__PURE__*/React.createElement(CalendarWeekHeader, {
    locale: locale,
    weekdayFormat: weekdayFormat
  }), /*#__PURE__*/React.createElement(CalendarGrid, {
    locale: locale,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    month: month,
    onMonthChange: setMonth,
    onDayHover: onDayHover,
    onDayClick: onDayClick,
    touchDragEnabled: touchDragEnabled
  }));
}
Calendar.propTypes = {
  locale: object.isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  month: instanceOf(Date),
  onMonthChange: func,
  onDayHover: func,
  onDayClick: func,
  weekdayFormat: string,
  touchDragEnabled: bool
};

function DatePickerCalendar(_ref) {
  var locale = _ref.locale,
      selectedDate = _ref.date,
      receivedMonth = _ref.month,
      onDateChange = _ref.onDateChange,
      onMonthChange = _ref.onMonthChange,
      minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate,
      receivedModifiers = _ref.modifiers,
      modifiersClassNames = _ref.modifiersClassNames,
      weekdayFormat = _ref.weekdayFormat,
      touchDragEnabled = _ref.touchDragEnabled;

  var isSelected = function isSelected(date) {
    return isSameDay(date, selectedDate) && isSelectable(date, {
      minimumDate: minimumDate,
      maximumDate: maximumDate
    });
  };

  var modifiers = mergeModifiers({
    selected: isSelected,
    disabled: isSelected
  }, receivedModifiers);

  var _useControllableState = useControllableState(receivedMonth, onMonthChange, startOfMonth(selectedDate || new Date())),
      _useControllableState2 = _slicedToArray(_useControllableState, 2),
      month = _useControllableState2[0],
      setMonth = _useControllableState2[1];

  var handleDateChange = function handleDateChange(date) {
    onDateChange(selectedDate ? setTime(date, selectedDate) : date);
  };

  return /*#__PURE__*/React.createElement(Calendar, {
    locale: locale,
    month: month,
    onMonthChange: setMonth,
    onDayClick: handleDateChange,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  });
}
DatePickerCalendar.propTypes = {
  locale: object.isRequired,
  date: instanceOf(Date),
  month: instanceOf(Date),
  onDateChange: func,
  onMonthChange: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};

function DateRangePickerCalendar(_ref) {
  var locale = _ref.locale,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      focus = _ref.focus,
      receivedMonth = _ref.month,
      onStartDateChange = _ref.onStartDateChange,
      onEndDateChange = _ref.onEndDateChange,
      onFocusChange = _ref.onFocusChange,
      onMonthChange = _ref.onMonthChange,
      minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate,
      minimumLength = _ref.minimumLength,
      maximumLength = _ref.maximumLength,
      receivedModifiers = _ref.modifiers,
      modifiersClassNames = _ref.modifiersClassNames,
      weekdayFormat = _ref.weekdayFormat,
      touchDragEnabled = _ref.touchDragEnabled;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      hoveredDate = _useState2[0],
      setHoveredDate = _useState2[1];

  var _useControllableState = useControllableState(receivedMonth, onMonthChange, startOfMonth(startDate || endDate || new Date())),
      _useControllableState2 = _slicedToArray(_useControllableState, 2),
      month = _useControllableState2[0],
      setMonth = _useControllableState2[1];

  var displayedStartDate = focus === START_DATE && !startDate && endDate && hoveredDate && !isSameDay(hoveredDate, endDate) ? hoveredDate : startOfDay(startDate);
  var displayedEndDate = focus === END_DATE && !endDate && startDate && hoveredDate && !isSameDay(hoveredDate, startDate) ? hoveredDate : startOfDay(endDate);

  var isStartDate = function isStartDate(date) {
    return isSameDay(date, displayedStartDate) && isBefore(date, displayedEndDate);
  };

  var isMiddleDate = function isMiddleDate(date) {
    return isAfter(date, displayedStartDate) && isBefore(date, displayedEndDate);
  };

  var isEndDate = function isEndDate(date) {
    return isSameDay(date, displayedEndDate) && isAfter(date, displayedStartDate);
  };

  var modifiers = mergeModifiers({
    selected: function selected(date) {
      return isSelectable(date, {
        minimumDate: minimumDate,
        maximumDate: maximumDate
      }) && (isStartDate(date) || isMiddleDate(date) || isEndDate(date) || isSameDay(date, startDate) || isSameDay(date, endDate));
    },
    selectedStart: isStartDate,
    selectedMiddle: isMiddleDate,
    selectedEnd: isEndDate,
    disabled: function disabled(date) {
      return focus === START_DATE && endDate && (differenceInDays(startOfDay(endDate), date) < minimumLength && (!startDate || !isAfter(date, startOfDay(endDate))) || !startDate && maximumLength && differenceInDays(startOfDay(endDate), date) > maximumLength) || focus === END_DATE && startDate && (differenceInDays(date, startOfDay(startDate)) < minimumLength && (!endDate || !isBefore(date, startOfDay(startDate))) || !endDate && maximumLength && differenceInDays(date, startOfDay(startDate)) > maximumLength);
    }
  }, receivedModifiers);

  var handleSelectDate = function handleSelectDate(date) {
    if (focus === START_DATE) {
      var invalidEndDate = endDate && !isRangeLengthValid({
        startDate: date,
        endDate: endDate
      }, {
        minimumLength: minimumLength,
        maximumLength: maximumLength
      });

      if (invalidEndDate) {
        onEndDateChange(null);
      }

      onStartDateChange(startDate ? setTime(date, startDate) : date);
      onFocusChange(END_DATE);
    } else if (focus === END_DATE) {
      var invalidStartDate = startDate && !isRangeLengthValid({
        startDate: startDate,
        endDate: date
      }, {
        minimumLength: minimumLength,
        maximumLength: maximumLength
      });

      if (invalidStartDate) {
        onStartDateChange(null);
      }

      onEndDateChange(endDate ? setTime(date, endDate) : date);
      onFocusChange(invalidStartDate || !startDate ? START_DATE : null);
    }
  };

  return /*#__PURE__*/React.createElement(Calendar, {
    locale: locale,
    month: month,
    onMonthChange: setMonth,
    onDayHover: setHoveredDate,
    onDayClick: handleSelectDate,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  });
}
DateRangePickerCalendar.propTypes = {
  locale: object.isRequired,
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  focus: oneOf([START_DATE, END_DATE]),
  month: instanceOf(Date),
  onStartDateChange: func.isRequired,
  onEndDateChange: func.isRequired,
  onFocusChange: func.isRequired,
  onMonthChange: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  minimumLength: number,
  maximumLength: number,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};
DateRangePickerCalendar.defaultProps = {
  onStartDateChange: function onStartDateChange() {},
  onEndDateChange: function onEndDateChange() {},
  onFocusChange: function onFocusChange() {},
  minimumLength: 0,
  maximumLength: null
};

var Popover = React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      open = _ref.open;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('nice-dates-popover', {
      '-open': open
    }),
    ref: ref
  }, children);
});
Popover.displayName = 'Popover';
Popover.propTypes = {
  children: node,
  open: bool
};

function useDateInput(_ref) {
  var selectedDate = _ref.date,
      receivedFormatString = _ref.format,
      locale = _ref.locale,
      minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate,
      onDateChange = _ref.onDateChange,
      validate = _ref.validate;
  var formatString = receivedFormatString || locale.formatLong.date({
    width: 'short'
  });

  var formatDate = function formatDate(date) {
    return format(date, formatString, {
      locale: locale
    });
  };

  var parseDate = function parseDate(dateString) {
    return parse(dateString, formatString, selectedDate || new Date());
  };

  var isValidAndSelectable = function isValidAndSelectable(date) {
    return isValid(date) && isSelectable(date, {
      minimumDate: minimumDate,
      maximumDate: maximumDate
    }) && (!validate || validate(date));
  };

  var _useState = useState(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : ''),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      focused = _useState4[0],
      setFocused = _useState4[1];

  var handleFocus = function handleFocus() {
    setFocused(true);
  };

  var handleChange = function handleChange(event) {
    var newValue = event.target.value;
    var parsedDate = parseDate(newValue);
    setValue(newValue);

    if (isValidAndSelectable(parsedDate)) {
      onDateChange(parsedDate);
    }
  };

  var handleBlur = function handleBlur() {
    if (value) {
      var parsedDate = parseDate(value);

      if (isValidAndSelectable(parsedDate)) {
        setValue(formatDate(parsedDate));
      } else if (isValidAndSelectable(selectedDate)) {
        setValue(formatDate(selectedDate));
      } else {
        setValue('');
      }
    } else if (selectedDate) {
      onDateChange(null);
    }

    setFocused(false);
  };

  useEffect(function () {
    if (!focused) {
      setValue(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : '');
    }
  }, [selectedDate, focused]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    onFocus: handleFocus,
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: formatString.toLowerCase(),
    type: 'text',
    value: value
  };
}

function useDetectTouch() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isTouch = _useState2[0],
      setIsTouch = _useState2[1];

  useEffect(function () {
    var handleTouch = function handleTouch() {
      setIsTouch(true);
      removeListener();
    };

    var removeListener = function removeListener() {
      document.removeEventListener('touchstart', handleTouch);
    };

    document.addEventListener('touchstart', handleTouch);
    return removeListener;
  }, []);
  return isTouch;
}

function useOutsideClickHandler(callback) {
  var refA = useRef();
  var refB = useRef();
  var refC = useRef();
  useEffect(function () {
    var handleOutsideClick = function handleOutsideClick(event) {
      if ((!refA.current || refA.current.contains && !refA.current.contains(event.target)) && (!refB.current || refB.current.contains && !refB.current.contains(event.target)) && (!refC.current || refC.current.contains && !refC.current.contains(event.target))) {
        callback();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return function () {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [callback]);
  return [refA, refB, refC];
}

function DatePicker(_ref) {
  var children = _ref.children,
      locale = _ref.locale,
      date = _ref.date,
      _onDateChange = _ref.onDateChange,
      format = _ref.format,
      minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate,
      modifiers = _ref.modifiers,
      modifiersClassNames = _ref.modifiersClassNames,
      weekdayFormat = _ref.weekdayFormat,
      touchDragEnabled = _ref.touchDragEnabled;

  var _useState = useState(date || new Date()),
      _useState2 = _slicedToArray(_useState, 2),
      month = _useState2[0],
      setMonth = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      focused = _useState4[0],
      setFocused = _useState4[1];

  var isTouch = useDetectTouch();

  var _useOutsideClickHandl = useOutsideClickHandler(function () {
    if (focused) {
      setFocused(false);
    }
  }),
      _useOutsideClickHandl2 = _slicedToArray(_useOutsideClickHandl, 2),
      inputRef = _useOutsideClickHandl2[0],
      popoverRef = _useOutsideClickHandl2[1];

  var inputProps = useDateInput({
    date: date,
    format: format,
    locale: locale,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    onDateChange: function onDateChange(date) {
      _onDateChange(date);

      date && setMonth(date);
    }
  });

  var handleDateChange = function handleDateChange(date) {
    _onDateChange(date);

    setFocused(false);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates"
  }, children({
    inputProps: _objectSpread2(_objectSpread2({}, inputProps), {}, {
      ref: inputRef,
      onFocus: function onFocus() {
        inputProps.onFocus();
        setFocused(true);

        if (isTouch) {
          inputRef.current.blur();
        }
      },
      readOnly: isTouch
    }),
    focused: focused
  }), /*#__PURE__*/React.createElement(Popover, {
    open: focused,
    ref: popoverRef
  }, /*#__PURE__*/React.createElement(DatePickerCalendar, {
    locale: locale,
    date: date,
    month: month,
    onDateChange: handleDateChange,
    onMonthChange: setMonth,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  })));
}
DatePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  date: instanceOf(Date),
  onDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};
DatePicker.defaultProps = {
  onDateChange: function onDateChange() {}
};

function DateRangePicker(_ref) {
  var children = _ref.children,
      locale = _ref.locale,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      onStartDateChange = _ref.onStartDateChange,
      onEndDateChange = _ref.onEndDateChange,
      format = _ref.format,
      minimumDate = _ref.minimumDate,
      maximumDate = _ref.maximumDate,
      minimumLength = _ref.minimumLength,
      maximumLength = _ref.maximumLength,
      modifiers = _ref.modifiers,
      modifiersClassNames = _ref.modifiersClassNames,
      weekdayFormat = _ref.weekdayFormat,
      touchDragEnabled = _ref.touchDragEnabled;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var _useState3 = useState(startDate || endDate || new Date()),
      _useState4 = _slicedToArray(_useState3, 2),
      month = _useState4[0],
      setMonth = _useState4[1];

  var isTouch = useDetectTouch();

  var _useOutsideClickHandl = useOutsideClickHandler(function () {
    setFocus(null);
  }),
      _useOutsideClickHandl2 = _slicedToArray(_useOutsideClickHandl, 3),
      startDateInputRef = _useOutsideClickHandl2[0],
      endDateInputRef = _useOutsideClickHandl2[1],
      popoverRef = _useOutsideClickHandl2[2];

  var startDateInputProps = useDateInput({
    date: startDate,
    format: format,
    locale: locale,
    maximumDate: maximumDate,
    minimumDate: minimumDate,
    onDateChange: function onDateChange(date) {
      onStartDateChange(date);
      date && setMonth(date);
    },
    validate: function validate(date) {
      return !endDate || isRangeLengthValid({
        startDate: date,
        endDate: endDate
      }, {
        minimumLength: minimumLength,
        maximumLength: maximumLength
      });
    }
  });
  var endDateInputProps = useDateInput({
    date: endDate,
    format: format,
    locale: locale,
    maximumDate: maximumDate,
    minimumDate: minimumDate,
    onDateChange: function onDateChange(date) {
      onEndDateChange(date);
      date && setMonth(date);
    },
    validate: function validate(date) {
      return !startDate || isRangeLengthValid({
        startDate: startDate,
        endDate: date
      }, {
        minimumLength: minimumLength,
        maximumLength: maximumLength
      });
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates"
  }, children({
    startDateInputProps: _objectSpread2(_objectSpread2({}, startDateInputProps), {}, {
      onFocus: function onFocus() {
        startDateInputProps.onFocus();
        setFocus(START_DATE);

        if (isTouch) {
          startDateInputRef.current.blur();
        }
      },
      ref: startDateInputRef,
      readOnly: isTouch
    }),
    endDateInputProps: _objectSpread2(_objectSpread2({}, endDateInputProps), {}, {
      onFocus: function onFocus() {
        endDateInputProps.onFocus();
        setFocus(END_DATE);

        if (isTouch) {
          endDateInputRef.current.blur();
        }
      },
      ref: endDateInputRef,
      readOnly: isTouch
    }),
    focus: focus
  }), /*#__PURE__*/React.createElement(Popover, {
    open: !!focus,
    ref: popoverRef
  }, /*#__PURE__*/React.createElement(DateRangePickerCalendar, {
    locale: locale,
    startDate: startDate,
    endDate: endDate,
    focus: focus,
    month: month,
    onStartDateChange: onStartDateChange,
    onEndDateChange: onEndDateChange,
    onFocusChange: setFocus,
    onMonthChange: setMonth,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    minimumLength: minimumLength,
    maximumLength: maximumLength,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  })));
}
DateRangePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  onStartDateChange: func,
  onEndDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  minimumLength: number,
  maximumLength: number,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};
DateRangePicker.defaultProps = {
  onStartDateChange: function onStartDateChange() {},
  onEndDateChange: function onEndDateChange() {},
  minimumLength: 0,
  maximumLength: null
};

export { Calendar, CalendarDay, CalendarGrid, CalendarNavigation, CalendarWeekHeader, DatePicker, DatePickerCalendar, DateRangePicker, DateRangePickerCalendar, END_DATE, Popover, START_DATE, useDateInput };
