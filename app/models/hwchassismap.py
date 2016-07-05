from app import db

class Hwchassismap(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    slotnumber = db.Column(db.Integer)
    

    def to_dict(self):
        return dict(
            slotnumber = self.slotnumber,
            id = self.id
        )

    def __repr__(self):
        return '<Hwchassismap %r>' % (self.id)
