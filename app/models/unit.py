from app import db

class Unit(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    name = db.Column(db.String)
    

    def to_dict(self):
        return dict(
            name = self.name,
            id = self.id
        )

    def __repr__(self):
        return '<Unit %r>' % (self.id)
