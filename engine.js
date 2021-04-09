'use strict';

const GRAVITY = 18;
const JUMP_ACCEL = [ 400, 197, 95, 45, 16, 4];
const JUMP_CYCLE = 6;
const MOVE_MAX = 600;
const WALK_MAX = 200;
const DELTA_MOVE = 80;
const INERTIA = 0.65;

class Vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	get length() {
		return Math.sqrt(x*x+y*y);
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
	}

	addPt(x, y) {
		this.x += x;
		this.y += y;
	}

	multiply(a) {
		this.x *= a;
		this.y *= a;
	}

	dot(v) {
		return (this.x*v.x + this.y*v.y);
	}
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    hitTest(other) {
        const horizontal = (other.x < this.x + this.w) &&
            (this.x < other.x + other.w);
        const vertical = (other.y < this.y + this.h) &&
            (this.y < other.y + other.h);
        return (horizontal && vertical);
    }
}


class GameEvent {
	constructor(target) {
		this.target = target;
	}
}

class EventDispatcher {
    constructor() {
        this._eventListeners = {};
    }

    addEventListener(type, callback) {
        if(this._eventListeners[type] == undefined) {
            this._eventListeners[type] = [];
        }

        this._eventListeners[type].push(callback);
	}
	
	removeEventListener(type, callback) {
		this._eventListeners[type] = this._eventListeners[type].filter(n => n != callback);
	}

    dispatchEvent(type, event) {
        const listeners = this._eventListeners[type];
        if(listeners != undefined) listeners.forEach((callback) => callback(event));
    }
}

class Sprite  {
	constructor(image, rect) {
		this.image = image;
		this.rect = rect;
	}
}

class GameObject extends EventDispatcher {
	constructor(sprite) {
		super();
		this.sprite = sprite;
	}

	render(target) {
        const context = target.getContext('2d');
        const rect = this.sprite.rect;
		let p = VectoV(PostoW(rect.x, rect.y));
        context.drawImage(this.sprite.image,
            p.x, p.y,
            rect.w, rect.h);
	}

	isOutOfBounds(boundRect) {
        const horizontal = (boundRect.x > this.x + this.w) ||
            (this.x > boundRect.x + boundRect.w);
        const vertical = (boundRect.y > this.y + this.h) ||
            (this.y > boundRect.y + boundRect.h);
        return (horizontal && vertical);
	}

	get x() {
		return this.sprite.rect.x;
	}

	set x(value) {
		this.sprite.rect.x = value;
	}

	get y() {
		return this.sprite.rect.y;
	}

	set y(value) {
		this.sprite.rect.y = value;
	}
}

class Chara extends GameObject {
	constructor(sprite) {
		super(sprite);
		this.dir = new Vec2(0, 0);
		this.move = new Vec2(0, 0);
		this.accel = new Vec2(0, 0);	// 厳密には、加速度自体より、加速度分を加算している速度ベクトル。
	}

	render(target) {
        const context = target.getContext('2d');
        const rect = this.sprite.rect;
		let p = VectoV(PostoW(rect.x, rect.y));
			
		if (this.dir.x > 0) {
			context.scale(-1,1);
			context.drawImage(this.sprite.image, -(p.x+rect.w), p.y, rect.w, rect.h);
			context.scale(-1,1);
		}
		else {
			context.drawImage(this.sprite.image, p.x, p.y, rect.w, rect.h);
		}
	}
}

class Player extends Chara {
	constructor(sprite) {
		super(sprite);
		this.jumping = false;
	}

	onLanding() {
        this.dispatchEvent('onlanding', new GameEvent(this));
    }
	
	update() {
		this.move.x = this.move.y = 0;
		if (keys["Left"] > 0) {
			this.accel.x -= DELTA_MOVE;		
			this.dir.x = -1;
		}
		else if (keys["Right"] > 0) {
			this.accel.x += DELTA_MOVE;
			this.dir.x = 1;
		}
		else {
			this.accel.x *= INERTIA;
		}

		if (keys["Jump"] > 0) {
			if (this.jumping && keys["Jump"] % JUMP_CYCLE == 0) {
				this.accel.y -= JUMP_ACCEL[Math.floor(keys["Jump"]/JUMP_CYCLE)];
				if (Math.floor(keys["Jump"]/JUMP_CYCLE)+1 >= JUMP_ACCEL.length) {
					this.jumping = false;
				}
			}
			else if (keys["Jump"]==1) {
				let wp = PostoW(this.x, this.y);
				wp.addPt(0, TILE_SIZE);
				let jumpable = (pointInTile(wp) == 1);
				wp.addPt(TILE_SIZE-1, 0);
				jumpable = jumpable || (pointInTile(wp) == 1);
				if (jumpable) {
					this.jumping = true;
					this.accel.y -= JUMP_ACCEL[0];
					playSound(Asset.sounds['jump']);
				}
			}
		}
		else {
			this.jumping = false;
		}
		
		if (Math.abs(this.accel.x) > WALK_MAX) this.accel.x = WALK_MAX*Math.sign(this.accel.x);
		this.accel.y += GRAVITY;
		this.move.add(this.accel);
		
		if (Math.abs(this.move.y) > MOVE_MAX) { this.move.y = MOVE_MAX*Math.sign(this.move.y); }
		
		this.move = VectoL(checkTileCollision(this));
		this.x += this.move.x;
		this.y += this.move.y;
	}
}