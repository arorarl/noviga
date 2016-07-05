from app import db

class Hwchaschanmap(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    channelnumber = db.Column(db.Integer)
    
    trigger = db.Column(db.Enum('True', ' False'))
    

    def to_dict(self):
        return dict(
            channelnumber = self.channelnumber,
            trigger = self.trigger,
            id = self.id
        )

    def __repr__(self):
        return '<Hwchaschanmap %r>' % (self.id)
