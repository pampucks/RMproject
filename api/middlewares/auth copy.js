const utils = require("../services/utils");
const log = require('../services/log');

exports.Authentication = (req, res, next) => {
    const access_token = req.headers['x-access-token']
    if (!access_token) {
        // log.info(req.headers['user-agent'] + ' - ' + 'auth failed - Token is not found!');
        return next({ message: "Token is not found!" });
    } else {
        try {
            let tokenHeader = access_token.split(' ');

            if (tokenHeader[0] !== 'Bearer') {
                // log.info(req.headers['user-agent'] + ' - ' + 'auth failed - Invalid token format !');
                return next({ message: "Invalid token format !" });
            }
        
            let token = tokenHeader[1];
        
            if (!token) {
                // log.info(req.headers['user-agent'] + ' - ' + 'auth failed - No token provided !');
                return next({ message: "No token provided !" });
            }

            const decoded = utils.tokenVerifier(token);

            req.userData = decoded;
            const { is_active } = req.userData;

            if (is_active === true) {
                // log.info(req.headers['user-agent'] + ' - ' + 'auth success');
                next()
            } else {
                // log.info(req.headers['user-agent'] + ' - ' + 'auth failed - status not active');
                return next({ message: "Access Denied! Your status not active!" });
            }
        } catch (error) {
            log.error(error + " - failed auth")
            // console.log(`failed auth ${error}`)
            next(error);
        }
    }
};

exports.isMis = (req, res, next) => {
    try {
        const { role } = req.userData

        if (role === 'mis') {
            // log.info(req.headers['user-agent'] + ' - ' + 'auth success role MIS');
            next()
        } else {
            // log.info(req.headers['user-agent'] + ' - ' + 'auth failed - not MIS role');
            return next({ message: "Access Denied! Your role not MIS!" });
        }
    } catch (err) {
        log.error(err + " - Authentication isMis")
        next(err);
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        const { role } = req.userData

        if (role === 'admin') {
            // log.info(req.headers['user-agent'] + ' - ' + 'auth success role MIS');
            next()
        } else {
            // log.info(req.headers['user-agent'] + ' - ' + 'auth failed - not MIS role');
            return next({ message: "Access Denied! Your role not Admin!" });
        }
    } catch (err) {
        log.error(err + " - Authentication isAdmin")
        next(err);
    }
}

exports.isPicking = (req, res, next) => {
    try {
        const { role } = req.userData

        if (role === 'picking_admin' || role === 'picking_staff'  || role === 'admin') {
            next()
        } else {
            return next({ message: "Access Denied! Your role not picking!" });
        }
    } catch (err) {
        log.error(err + " - Authentication isPicking")
        next(err);
    }
}

exports.isPickingAdmin = (req, res, next) => {
    try {
        const { role } = req.userData

        if (role === 'picking_admin' || role === 'admin') {
            next()
        } else {
            return next({ message: "Access Denied! Your role not picking_admin!" });
        }
    } catch (err) {
        log.error(err + " - Authentication isPickingAdmin")
        next(err);
    }
}

exports.isPacking = (req, res, next) => {
    try {
        const { role } = req.userData

        if (role === 'packing_admin' || role === 'packing_staff' || role === 'admin') {
            next()
        } else {
            return next({ message: "Access Denied! Your role not packing!" });
        }
    } catch (err) {
        log.error(err + " - Authentication isPacking")
        next(err);
    }
}

exports.isPackingAdmin = (req, res, next) => {
    try {
        const { role } = req.userData

        if (role === 'packing_admin'|| role === 'admin') {
            next()
        } else {
            return next({ message: "Access Denied! Your role not packing_admin!" });
        }
    } catch (err) {
        log.error(err + " - Authentication isPackingAdmin")
        next(err);
    }
}